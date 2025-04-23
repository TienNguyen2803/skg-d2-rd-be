import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityCondition } from 'src/utils/types/entity-condition.type';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { StandartPaginationResult } from '../utils/types/standard-pagination-result.type';
import { standartPagination } from '../utils/standard-pagination';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRolesService } from '../user-roles/user-roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private userRolesService: UserRolesService,
  ) {}

  async create(createProfileDto: CreateUserDto): Promise<User> {
    const { roleIds, ...userData } = createProfileDto;

    const user = await this.usersRepository.save(
      this.usersRepository.create(userData),
    );

    // Thêm các roles cho user nếu có
    if (roleIds && roleIds.length > 0) {
      for (const roleId of roleIds) {
        await this.userRolesService.createUserRole(user.id, roleId);
      }
    }

    return user;
  }

  async findAll(
    paginationOptions?: IPaginationOptions,
  ): Promise<StandartPaginationResult<User>> {
    const result = await standartPagination(
      this.usersRepository,
      paginationOptions,
    );
    return {
      count: result.count,
      rows: result.rows,
    };
  }

  findOne(fields: EntityCondition<User>) {
    return this.usersRepository.findOne({
      where: fields as FindOptionsWhere<User>,
      relations: ['userRoles', 'userRoles.role'],
    });
  }

  async update(id: number, updateProfileDto: UpdateUserDto) {
    const { roleIds, ...userData } = updateProfileDto;

    // Cập nhật thông tin cơ bản của user
    const user = await this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...userData,
      }),
    );

    // Cập nhật roles cho user nếu có
    if (roleIds !== undefined) {
      // Xóa tất cả user_roles hiện tại của user
      await this.userRolesService.removeAllUserRoles(id);

      // Thêm các roles mới
      if (roleIds && roleIds.length > 0) {
        for (const roleId of roleIds) {
          await this.userRolesService.createUserRole(id, roleId);
        }
      }
    }

    return user;
  }

  async softDelete(id: number): Promise<void> {
    await this.usersRepository.softDelete(id);
  }
}