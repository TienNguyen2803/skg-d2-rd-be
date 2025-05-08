
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterBuilder } from '../utils/filter-builder';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);

    // Handle status relationship
    if (createUserDto.status_id) {
      user.status = { id: createUserDto.status_id } as any;
    }

    // Handle department relationship
    if (createUserDto.department_id) {
      user.department = { id: createUserDto.department_id } as any;
    }

    if (createUserDto.employee_type_id) {
      user.employee_type = { id: createUserDto.employee_type_id } as any;
    }

    await this.userRepository.save(user);

    return this.userRepository.findOneOrFail({
      where: { id: user.id },
      relations: ['department', 'status'],
    });
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
      relations: ['department', 'status'],
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

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['department', 'status'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email },
      relationLoadStrategy: 'join',
      relations:
      {
        department: true,
        status: true,
        userRoles: {
          role: {
            rolePermissions: {
              permission: {
                functionality: true,
                action: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${email} not found`);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['department', 'status'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Handle direct properties
    Object.assign(user, updateUserDto);

    // Handle status relationship
    if (updateUserDto.status_id) {
      user.status = { id: updateUserDto.status_id } as any;
    }

    // Handle department relationship
    if (updateUserDto.department_id) {
      user.department = { id: updateUserDto.department_id } as any;
    }

    if (updateUserDto.employee_type_id) {
      user.employee_type = { id: updateUserDto.employee_type_id } as any;
    }

    await this.userRepository.save(user);

    return this.userRepository.findOneOrFail({
      where: { id },
      relations: ['department', 'status'],
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.userRepository.softDelete(id);
  }
}
