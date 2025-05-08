
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { UpdateEmployeeTypeDto } from './dto/update-employee-type.dto';
import { EmployeeType } from './entities/employee-type.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterBuilder } from '../utils/filter-builder';

@Injectable()
export class EmployeeTypesService {
  constructor(
    @InjectRepository(EmployeeType)
    private employeeTypeRepository: Repository<EmployeeType>,
  ) {}

  create(createEmployeeTypeDto: CreateEmployeeTypeDto): Promise<EmployeeType> {
    const employeeType = this.employeeTypeRepository.create(createEmployeeTypeDto);
    return this.employeeTypeRepository.save(employeeType);
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

    return this.employeeTypeRepository.find(findOptions);
  }

  standardCount(search?: string): Promise<number> {
    const findOptions = FilterBuilder.buildFilter(search);
    return this.employeeTypeRepository.count(findOptions);
  }

  async findOne(id: number): Promise<EmployeeType> {
    const employeeType = await this.employeeTypeRepository.findOne({
      where: { id },
    });

    if (!employeeType) {
      throw new NotFoundException(`Employee Type with ID ${id} not found`);
    }

    return employeeType;
  }

  async update(id: number, updateEmployeeTypeDto: UpdateEmployeeTypeDto): Promise<EmployeeType> {
    const employeeType = await this.findOne(id);
    Object.assign(employeeType, updateEmployeeTypeDto);
    return this.employeeTypeRepository.save(employeeType);
  }

  async softDelete(id: number): Promise<void> {
    await this.employeeTypeRepository.softDelete(id);
  }
}
