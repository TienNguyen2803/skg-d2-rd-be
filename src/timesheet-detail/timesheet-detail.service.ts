
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { TimesheetDetail } from './entities/timesheet-detail.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterBuilder } from '../utils/filter-builder';
import { standardPagination } from '../utils/standard-pagination';

@Injectable()
export class TimesheetDetailService {
  constructor(
    @InjectRepository(TimesheetDetail)
    private timesheetDetailRepository: Repository<TimesheetDetail>,
  ) {}

  async create(createTimesheetDetailDto: CreateTimesheetDetailDto): Promise<TimesheetDetail> {
    try {
      // Validate timesheet exists before creating
      const timesheet = await this.timesheetDetailRepository.manager
        .getRepository('timesheet')
        .findOne({ where: { id: createTimesheetDetailDto.timesheet_id } });
      
      if (!timesheet) {
        throw new NotFoundException(`Timesheet with ID ${createTimesheetDetailDto.timesheet_id} not found`);
      }

      // Convert date string to Date object if needed
      const timesheetDetail = this.timesheetDetailRepository.create({
        ...createTimesheetDetailDto,
        date: new Date(createTimesheetDetailDto.date)
      });
      
      return await this.timesheetDetailRepository.save(timesheetDetail);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Error creating timesheet detail: ${error.message}`);
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
