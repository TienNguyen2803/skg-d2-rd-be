import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterBuilder } from '../utils/filter-builder';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    if (createUserDto.department_id) {
      user.department = { id: createUserDto.department_id } as any;
    }
    if (createUserDto.roleId) {
      user.role = { id: createUserDto.roleId } as any;
    }

    await this.userRepository.save(user);

    return this.findOne(user.id);
  }

  async findManyWithPagination(
    { page, limit, offset }: IPaginationOptions,
    filterQuery?: string,
    sort?: string,
  ) {
    const findOptions = {
      ...FilterBuilder.buildFilter(filterQuery),
      skip: offset,
      take: limit,
      relations: ['department', 'role', 'status'],
      order: {},
    };

    if (sort) {
      const [field, direction] = sort.split(',');
      if (field && direction) {
        const upperDirection = direction.toUpperCase();
        if (upperDirection === 'ASC' || upperDirection === 'DESC') {
          findOptions.order = { [field]: upperDirection };
        }
      }
    } else {
      findOptions.order = { id: 'DESC' };
    }

    return this.userRepository.find(findOptions);
  }

  standardCount(filterQuery?: string): Promise<number> {
    const findOptions = FilterBuilder.buildFilter(filterQuery);
    return this.userRepository.count(findOptions);
  }

  async findOne(id: number | string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['department', 'role', 'status'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.department_id) {
      user.department = { id: updateUserDto.department_id } as any;
    }
    if (updateUserDto.roleId) {
      user.role = { id: updateUserDto.roleId } as any;
    }

    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return this.findOne(id);
  }

  async softDelete(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}