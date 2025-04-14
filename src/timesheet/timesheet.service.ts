import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, ILike, FindManyOptions } from 'typeorm';
import { IPaginationOptions } from '../utils/types/pagination-options';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { Timesheet } from './entities/timesheet.entity';
import { TimesheetStatus } from '../timesheet-status/entities/timesheet-status.entity';
import { Response } from 'express';
import * as fs from 'fs';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectRepository(Timesheet)
    private timesheetRepository: Repository<Timesheet>,
    @InjectRepository(TimesheetStatus)
    private timesheetStatusRepository: Repository<TimesheetStatus>,
  ) { }

  async create(createTimesheetDto: CreateTimesheetDto, userId: number) {
    const draftStatus = await this.timesheetStatusRepository.findOneOrFail({
      where: { code: 'DRAFT' },
    });

    const timesheet = this.timesheetRepository.create({
      ...createTimesheetDto,
      creator_id: userId,
      status_id: draftStatus.id,
      total_hours: createTimesheetDto.total_hours ? Number(createTimesheetDto.total_hours) : 0,
    });

    return this.timesheetRepository.save(timesheet);
  }

  async findManyWithPagination(
    paginationOptions: IPaginationOptions,
    filterQuery?: string,
    sort?: string,
    creatorId?: number,
    isAdmin?: boolean,
  ) {
    const where: FindOptionsWhere<Timesheet> = {};
    
    if (!isAdmin) {
      where.creator_id = creatorId;
    }

    if (filterQuery) {
      where.month_year = ILike(`%${filterQuery}%`);
    }

    const order: Record<string, 'ASC' | 'DESC'> = {};
    if (sort) {
      const [field, direction] = sort.split(',');
      order[field] = direction.toUpperCase() as 'ASC' | 'DESC';
    } else {
      order.id = 'DESC';
    }

    const findOptions: FindManyOptions<Timesheet> = {
      where,
      order,
      skip: paginationOptions.offset,
      take: paginationOptions.limit,
      relations: ['creator', 'project', 'department', 'status', 'details'],
    };

    return this.timesheetRepository.find(findOptions);
  }

  async standardCount(
    filterQuery?: string,
    creatorId?: number,
    isAdmin?: boolean,
  ): Promise<number> {
    const where: FindOptionsWhere<Timesheet> = {};
    
    if (!isAdmin) {
      where.creator_id = creatorId;
    }

    if (filterQuery) {
      where.month_year = ILike(`%${filterQuery}%`);
    }

    return this.timesheetRepository.count({ where });
  }

  async findOne(id: number) {
    const timesheet = await this.timesheetRepository.findOne({
      where: { id },
      relations: ['creator', 'project', 'department', 'status', 'details'],
    });

    if (!timesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }

    return timesheet;
  }

  async updateStatus(id: number, status_code: string) {
    const timesheet = await this.findOne(id);

    if (!timesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }

    const status = await this.timesheetStatusRepository.findOne({
      where: { code: status_code }
    });

    if (!status) {
      throw new NotFoundException(`Status with code ${status_code} not found`);
    }

    timesheet.status = { id: status.id } as TimesheetStatus;
    return this.timesheetRepository.save(timesheet);
  }

  async updateRejectReason(id: number, reject_reason: string) {
    const timesheet = await this.findOne(id);

    if (!timesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }

    timesheet.reject_reason = reject_reason;

    const status = await this.timesheetStatusRepository.findOne({
      where: { code: "REJECT" }
    });

    if (!status) {
      throw new NotFoundException(`Status with code REJECT not found`);
    }

    timesheet.status = { id: status.id } as TimesheetStatus;

    return this.timesheetRepository.save(timesheet);
  }

  async remove(id: number): Promise<void> {
    const timesheet = await this.findOne(id);
    if (!timesheet) {
      throw new NotFoundException(`Timesheet with ID ${id} not found`);
    }

    // First delete all related timesheet details
    await this.timesheetRepository.manager.transaction(async (manager) => {
      // Soft delete timesheet details
      await manager
        .createQueryBuilder()
        .softDelete()
        .from('timesheet_detail')
        .where('timesheet_id = :id', { id })
        .execute();

      // Soft delete the timesheet
      await manager.softDelete('timesheet', { id });
    });
  }

  calculateOvertimeHours(details: any[]): { weekdayBeforeHours: number; weekdayAfterHours: number; sundayBeforeHours: number; sundayAfterHours: number } {
    let weekdayBeforeHours = 0;
    let weekdayAfterHours = 0;
    let sundayBeforeHours = 0;
    let sundayAfterHours = 0;

    details.forEach(detail => {
      const date = new Date(detail.date);
      const dayOfWeek = date.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday
      const endTime = parseInt(detail.end_time.split(':')[0]);

      if (dayOfWeek === 0) { // Sunday
        if (endTime < 22) {
          sundayBeforeHours += detail.ot_hours;
        } else {
          sundayAfterHours += detail.ot_hours;
        }
      } else if (dayOfWeek >= 1 && dayOfWeek <= 6) { // Monday - Saturday
        if (endTime < 22) {
          weekdayBeforeHours += detail.ot_hours;
        } else {
          weekdayAfterHours += detail.ot_hours;
        }
      }
    });

    return { weekdayBeforeHours, weekdayAfterHours, sundayBeforeHours, sundayAfterHours };
  }


  async exportToExcel(res: Response, month_year: string): Promise<Response> {
    try {
      const templatePath = path.join(
        process.cwd(),
        'src',
        'template',
        'template.xlsx',
      );

      if (!fs.existsSync(templatePath)) {
        throw new NotFoundException('Template file not found');
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(templatePath);

      // Get all worksheet names for debugging
      const worksheetNames = workbook.worksheets.map(ws => ws.name);
      console.log('Available worksheets:', worksheetNames);

      // Get worksheet by name
      const worksheet = workbook.getWorksheet('01.Summary');
      if (!worksheet) {
        throw new NotFoundException('Excel worksheet not found');
      }

      // Filter timesheets by month_date
      const timesheets = await this.timesheetRepository.find({
        where: { month_year },
        relations: ['creator', 'project', 'department', 'status', 'details']
      });
      console.log(timesheets)
      worksheet.getCell(`B5`).value = `${timesheets[0].month_year}-25`;
      try {
        timesheets.forEach((item, index) => {
          console.log('item', item.details);
          const { weekdayBeforeHours, weekdayAfterHours, sundayBeforeHours, sundayAfterHours } = this.calculateOvertimeHours(item.details);

          const rowIndex = index + 8;
          worksheet.getCell(`A${rowIndex}`).value = index + 1;
          worksheet.getCell(`B${rowIndex}`).value = "Operation";
          worksheet.getCell(`C${rowIndex}`).value = item.project.name;
          worksheet.getCell(`D${rowIndex}`).value = "Fixed Price";
          worksheet.getCell(`E${rowIndex}`).value = item.creator.short_name;
          worksheet.getCell(`F${rowIndex}`).value = item.creator.firstName + " " + item.creator.lastName;
          worksheet.getCell(`G${rowIndex}`).value = weekdayBeforeHours;
          worksheet.getCell(`H${rowIndex}`).value = weekdayAfterHours;
          worksheet.getCell(`I${rowIndex}`).value = sundayBeforeHours;
          worksheet.getCell(`J${rowIndex}`).value = sundayAfterHours;
          worksheet.getCell(`K${rowIndex}`).value = 0;
          worksheet.getCell(`L${rowIndex}`).value = 0;
          worksheet.getCell(`M${rowIndex}`).value = weekdayBeforeHours * 1.5 + weekdayAfterHours * 2 + sundayBeforeHours * 2 + sundayAfterHours * 2.5
          // Add sum formula for columns G to L
          // worksheet.getCell(`M${rowIndex}`).value = {
          //   formula: `=SUM(G${rowIndex}:L${rowIndex})`
          // };
          worksheet.getCell(`N${rowIndex}`).value = item.creator.short_name;
          worksheet.getCell(`O${rowIndex}`).value = "Link";
          worksheet.getCell(`P${rowIndex}`).value = {
            formula: `M${rowIndex}/2`
          };
          worksheet.getCell(`Q${rowIndex}`).value = {
            formula: `M${rowIndex}/2`
          };
        });

        const buffer = await workbook.xlsx.writeBuffer();


        // Remove excess rows from 14 to 24

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=OT_Records.xlsx');
        res.end(buffer);
        return {} as any;
      } catch (error) {
        console.error('Error writing Excel data:', error);
        throw new InternalServerErrorException('Error writing Excel data: ' + error.message);
      }
    } catch (error) {
      console.error('Error exporting Excel:', error.message);
      throw new InternalServerErrorException('Failed to export Excel: ' + error.message);
    }
  }
}