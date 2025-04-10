
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll(creatorId: number) {
    return this.timesheetRepository.find({
      where: { creator_id: creatorId },
      relations: ['creator', 'project', 'department', 'status', 'details'],
    });
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
}
