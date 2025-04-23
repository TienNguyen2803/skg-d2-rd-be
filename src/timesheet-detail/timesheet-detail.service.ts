
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
    try {
      // Tìm chi tiết timesheet hiện tại
      const timesheetDetail = await this.findOne(id);
      if (!timesheetDetail) {
        throw new NotFoundException(`Timesheet detail with ID ${id} not found`);
      }

      // Tìm timesheet liên quan
      const timesheet = await this.timesheetRepository.findOne({
        where: { id: timesheetDetail.timesheet_id },
      });

      if (!timesheet) {
        throw new NotFoundException(`Timesheet with ID ${timesheetDetail.timesheet_id} not found`);
      }

      // Lấy giá trị ot_hours mới từ DTO
      const oldOtHours = timesheetDetail.ot_hours || 0;
      const newOtHours = updateTimesheetDetailDto.ot_hours !== undefined
        ? Number(updateTimesheetDetailDto.ot_hours)
        : oldOtHours;

      // Cập nhật tổng số giờ làm việc của timesheet
      // Trừ đi giá trị cũ và cộng thêm giá trị mới
      const currentTotal = parseFloat(timesheet.total_hours?.toString() || '0');
      timesheet.total_hours = currentTotal - oldOtHours + newOtHours;
      console.log('Debug:', {
        currentTotal,
        oldOtHours,
        newOtHours,
        newTotal: timesheet.total_hours
      });
      // Đảm bảo total_hours không âm
      if (timesheet.total_hours < 0) {
        timesheet.total_hours = 0;
      }

      // Lưu timesheet đã cập nhật
      await this.timesheetRepository.save(timesheet);

      // Cập nhật chi tiết timesheet
      Object.assign(timesheetDetail, updateTimesheetDetailDto);

      // Lưu và trả về chi tiết timesheet đã cập nhật
      return this.timesheetDetailRepository.save(timesheetDetail);
    } catch (error) {
      throw new Error('Error updating timesheet detail: ' + error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      // Find the detail before deleting
      const detail = await this.timesheetDetailRepository.findOne({
        where: { id },
      });

      if (!detail) {
        throw new NotFoundException(`Timesheet detail with ID ${id} not found`);
      }

      // Find the related timesheet
      const timesheet = await this.timesheetRepository.findOne({
        where: { id: detail.timesheet_id },
      });

      if (!timesheet) {
        throw new NotFoundException(`Timesheet with ID ${detail.timesheet_id} not found`);
      }

      // Update timesheet total_hours by subtracting detail's ot_hours
      timesheet.total_hours = (timesheet.total_hours || 0) - (detail.ot_hours || 0);
      await this.timesheetRepository.save(timesheet);

      // Soft delete the detail
      await this.timesheetDetailRepository.softDelete(id);
    } catch (error) {
      throw new Error('Error deleting timesheet detail: ' + error.message);
    }
  }
}
