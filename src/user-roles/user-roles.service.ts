
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';

@Injectable()
export class UserRolesService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
  ) {}

  async createUserRole(userId: number, roleId: number): Promise<UserRole> {
    const userRole = this.userRoleRepository.create({
      user_id: userId,
      role_id: roleId,
    });
    return this.userRoleRepository.save(userRole);
  }

  async findUserRoles(userId: number): Promise<UserRole[]> {
    return this.userRoleRepository.find({
      where: { user_id: userId },
      relations: ['role'],
    });
  }

  async removeUserRole(userId: number, roleId: number): Promise<void> {
    await this.userRoleRepository.delete({
      user_id: userId,
      role_id: roleId,
    });
  }

  async removeAllUserRoles(userId: number): Promise<void> {
    await this.userRoleRepository.delete({ user_id: userId });
  }
}
