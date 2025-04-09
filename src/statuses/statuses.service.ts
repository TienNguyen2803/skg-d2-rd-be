
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Status } from './entities/status.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterBuilder } from '../utils/filter-builder';

@Injectable()
export class StatusesService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  create(createStatusDto: CreateStatusDto): Promise<Status> {
    const status = this.statusRepository.create(createStatusDto);
    return this.statusRepository.save(status);
  }

  async findManyWithPagination(
    { page, limit, offset }: IPaginationOptions,
    search?: string,
  ) {
    const findOptions = {
      ...FilterBuilder.buildFilter(search),
      skip: offset,
      take: limit,
      order: { id: 'DESC' },
    };

    return this.statusRepository.find(findOptions);
  }

  standardCount(search?: string): Promise<number> {
    const findOptions = FilterBuilder.buildFilter(search);
    return this.statusRepository.count(findOptions);
  }

  async findOne(id: number): Promise<Status> {
    const status = await this.statusRepository.findOne({
      where: { id },
    });

    if (!status) {
      throw new NotFoundException(`Status with ID ${id} not found`);
    }

    return status;
  }

  async update(id: number, updateStatusDto: UpdateStatusDto): Promise<Status> {
    const status = await this.findOne(id);
    Object.assign(status, updateStatusDto);
    return this.statusRepository.save(status);
  }

  async softDelete(id: number): Promise<void> {
    await this.statusRepository.softDelete(id);
  }
}
