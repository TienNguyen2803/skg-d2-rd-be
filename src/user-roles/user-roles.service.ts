
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { CreateUserRolesDto } from './dto/create-user-roles.dto';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) { }

  async createUserRole(userId: number, roleId: number): Promise<UserRole> {
    const userRole = this.userRoleRepository.create({
      user_id: userId,
      role_id: roleId,
    });
    return this.userRoleRepository.save(userRole);
  }

  async createUserRoles(createUserRolesDto: CreateUserRolesDto): Promise<{ message: string }> {
    try {
      const { user_role_assignments } = createUserRolesDto;
      
      // Tạo mảng các entity userRole
      const userRoles = user_role_assignments.map(assignment => 
        this.userRoleRepository.create({
          user_id: assignment.user_id,
          role_id: assignment.role_id,
        })
      );
      
      // Lưu tất cả các user roles
      await this.userRoleRepository.save(userRoles);
      
      return { message: 'Cập nhật user_roles thành công' };
    } catch (error) {
      throw new BadRequestException({
        message: 'Cập nhật user_roles không thành công',
        error: error.message
      });
    }
  }

  async findUserRoles(userId: number): Promise<UserRole[]> {
    return this.userRoleRepository.find({
      where: { user_id: userId },
      relations: ['role']
    });
  }

  async findUsersByRoleId(roleId: number): Promise<UserRole[]> {
    return this.userRoleRepository.find({
      where: { role_id: roleId },
      relations: ['user', 'user.department', 'user.status']
    });
  }

  async removeUserRole(userId: number, roleId: number): Promise<void> {
    const userRole = await this.userRoleRepository.findOne({
      where: {
        user_id: userId,
        role_id: roleId,
      }
    });

    if (userRole) {
      await this.userRoleRepository.softDelete({
        user_id: userId,
        role_id: roleId,
      });
    }
  }

  async removeAllUserRoles(userId: number): Promise<void> {
    await this.userRoleRepository.softDelete({ user_id: userId });
  }
}
