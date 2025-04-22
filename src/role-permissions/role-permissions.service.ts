
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

      // Get the role_id from root level
      const roleId = createRolePermissionDto.role_id;
      
      // Get unique permission IDs for validation
      const permissionIds = [...new Set(createRolePermissionDto.rolePermissions.map(item => item.permission_id))];

      // Validate if role exists
      const role = await this.roleRepository.findOne({ where: { id: roleId } });
      if (!role) {
        throw new NotFoundException(`Role with ID ${roleId} not found`);
      }

      // Validate if permissions exist
      const permissions = await this.permissionRepository.find({ where: { id: In(permissionIds) } });
      if (permissions.length !== permissionIds.length) {
        throw new NotFoundException('One or more permissions not found');
      }

      // Delete existing role permissions for the specified role
      await this.rolePermissionRepository.delete({ role_id: roleId });

      // Create new role permissions
      const rolePermissions = createRolePermissionDto.rolePermissions.map(item => {
        return this.rolePermissionRepository.create({
          role_id: roleId,
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
