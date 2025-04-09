
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterBuilder } from '../utils/filter-builder';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(role);
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

    return this.roleRepository.find(findOptions);
  }

  standardCount(search?: string): Promise<number> {
    const findOptions = FilterBuilder.buildFilter(search);
    return this.roleRepository.count(findOptions);
  }

  async findOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    Object.assign(role, updateRoleDto);
    return this.roleRepository.save(role);
  }

  async softDelete(id: number): Promise<void> {
    await this.roleRepository.softDelete(id);
  }
}
