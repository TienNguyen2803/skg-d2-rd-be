
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { RolePermission } from './entities/role-permission.entity';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { Role } from '../roles/entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class RolePermissionsService {
  constructor(
    @InjectRepository(RolePermission)
    private rolePermissionRepository: Repository<RolePermission>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createRolePermissionDto: CreateRolePermissionDto): Promise<{ success: boolean; message: string }> {
    try {
      if (!createRolePermissionDto.rolePermissions || createRolePermissionDto.rolePermissions.length === 0) {
        throw new BadRequestException('No role permissions provided');
      }

      // Get unique role IDs and permission IDs for validation
      const roleIds = [...new Set(createRolePermissionDto.rolePermissions.map(item => item.id))];
      const permissionIds = [...new Set(createRolePermissionDto.rolePermissions.map(item => item.permission_id))];

      // Validate if roles exist
      const roles = await this.roleRepository.find({ where: { id: In(roleIds) } });
      if (roles.length !== roleIds.length) {
        throw new NotFoundException('One or more roles not found');
      }

      // Validate if permissions exist
      const permissions = await this.permissionRepository.find({ where: { id: In(permissionIds) } });
      if (permissions.length !== permissionIds.length) {
        throw new NotFoundException('One or more permissions not found');
      }

      // First, delete existing role permissions for the specified role
      const roleId = createRolePermissionDto.rolePermissions[0].id;
      await this.rolePermissionRepository.delete({ role_id: roleId });

      // Create new role permissions
      const rolePermissions = createRolePermissionDto.rolePermissions.map(item => {
        return this.rolePermissionRepository.create({
          role_id: item.id,
          permission_id: item.permission_id,
        });
      });

      await this.rolePermissionRepository.save(rolePermissions);

      return {
        success: true,
        message: 'Role permissions created successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
