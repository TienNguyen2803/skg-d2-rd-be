
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { TimesheetDetail } from './entities/timesheet-detail.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterBuilder } from '../utils/filter-builder';
import { standardPagination } from '../utils/standard-pagination';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { Timesheet } from '../timesheet/entities/timesheet.entity';

@Injectable()
export class TimesheetDetailService {
  constructor(
    @InjectRepository(TimesheetDetail)
    private timesheetDetailRepository: Repository<TimesheetDetail>,
    @InjectRepository(Timesheet)
    private timesheetRepository: Repository<Timesheet>,
  ) { }

  async create(createTimesheetDetailDto: CreateTimesheetDetailDto): Promise<TimesheetDetail> {
    try {
      // Create new timesheet detail
      const timesheetDetail = this.timesheetDetailRepository.create({
        ...createTimesheetDetailDto,
        ot_hours: createTimesheetDetailDto.ot_hours ? Number(createTimesheetDetailDto.ot_hours) : 0,
      });
      
      // Save the timesheet detail
      const savedDetail = await this.timesheetDetailRepository.save(timesheetDetail);

      // Find the related timesheet
      const timesheet = await this.timesheetRepository.findOne({
        where: { id: createTimesheetDetailDto.timesheet_id },
      });

      if (!timesheet) {
        throw new NotFoundException(`Timesheet with ID ${createTimesheetDetailDto.timesheet_id} not found`);
      }

      // Update timesheet total_hours
      timesheet.total_hours = (timesheet.total_hours || 0) + (savedDetail.ot_hours || 0);
      await this.timesheetRepository.save(timesheet);

      return savedDetail;
    } catch (error) {
      throw new Error('Error creating timesheet detail: ' + error.message);
    }
  }

  async findAll(paginationOptions: IPaginationOptions, filterQuery?: string) {
    const findOptions = {
      ...FilterBuilder.buildFilter(filterQuery),
      skip: paginationOptions.offset,
      take: paginationOptions.limit,
      relations: ['timesheet'],
    };

    return standardPagination(
      await this.timesheetDetailRepository.find(findOptions),
      await this.timesheetDetailRepository.count(findOptions),
    );
  }

  async findOne(id: number): Promise<TimesheetDetail> {
    const timesheetDetail = await this.timesheetDetailRepository.findOne({
      where: { id },
      relations: ['timesheet'],
    });

    if (!timesheetDetail) {
      throw new NotFoundException(`Timesheet detail with ID ${id} not found`);
    }

    return timesheetDetail;
  }

  async update(id: number, updateTimesheetDetailDto: UpdateTimesheetDetailDto): Promise<TimesheetDetail> {
    const timesheetDetail = await this.findOne(id);
    Object.assign(timesheetDetail, updateTimesheetDetailDto);
    return this.timesheetDetailRepository.save(timesheetDetail);
  }

  async remove(id: number): Promise<void> {
    const timesheetDetail = await this.findOne(id);
    await this.timesheetDetailRepository.softDelete(id);
  }
}
