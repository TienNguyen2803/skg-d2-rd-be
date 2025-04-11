import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as ExcelJS from 'exceljs';
import * as path from 'path';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { Timesheet } from './entities/timesheet.entity';
import { TimesheetStatus } from '../timesheet-status/entities/timesheet-status.entity';

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

  async findAll(creatorId: number, isAdmin: boolean) {
    const baseQuery = {
      relations: ['creator', 'project', 'department', 'status', 'details'],
    };

    if (!isAdmin) {
      return this.timesheetRepository.find({
        ...baseQuery,
        where: { creator_id: creatorId },
      });
    }

    return this.timesheetRepository.find(baseQuery);
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

  async exportToExcel(data: any[]): Promise<Buffer> {
    try {
      const templatePath = path.join(process.cwd(), 'src', 'template', '【D2】_ Phieu theo doi lam them gio _ OT Records _ 202501.xlsx');
      const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(templatePath);
    
    const worksheet = workbook.getWorksheet(1);
    if (!worksheet) {
      throw new Error('Worksheet not found');
    }
    
    // Start from row 5 (after header)
    const startRow = 5;
    
    data.forEach((item, index) => {
      const row = worksheet.getRow(startRow + index);
      
      row.getCell(1).value = item.STT;
      row.getCell(2).value = item.Phòng;
      row.getCell(3).value = item['Dự án'];
      row.getCell(4).value = item['Loại dự án'];
      row.getCell(5).value = item['Mã nhân viên'];
      row.getCell(6).value = item['Họ và tên'];
      row.getCell(7).value = item['Số giờ làm thêm từ T2-T7'];
      row.getCell(8).value = item['Số giờ làm thêm đêm từ T2-T7 (Sau 22h00)'];
      row.getCell(9).value = item['Số giờ làm thêm đêm CN (Sau 22h00)'];
      row.getCell(10).value = item['Số giờ làm thêm ngày lễ (Sau 22h00)'];
      row.getCell(11).value = item['Tổng số giờ làm thêm'];
      row.getCell(12).value = item['Sheet name'];
      row.getCell(13).value = { text: 'Link', hyperlink: item['Hyperlink'] };
      row.getCell(14).value = item['Số giờ lương OT'];
      row.getCell(15).value = item['Số giờ nghỉ bù OT'];

      // Apply number format
      [7,8,9,10,11,14,15].forEach(col => {
        row.getCell(col).numFmt = '0.00';
      });
    });

    const buffer = await workbook.xlsx.writeBuffer() as Buffer;
    return buffer;
    } catch (error) {
      throw new Error(`Failed to export Excel: ${error.message}`);
    }
  }
}