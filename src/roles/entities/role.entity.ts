import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import { EntityHelper } from 'src/utils/entity-helper';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';

@Entity()
export class Role extends EntityHelper {
  @ApiProperty({ example: 1 })
  @PrimaryColumn()
  id: number;

  @Allow()
  @ApiProperty({ example: 'Admin' })
  @Column()
  name?: string;

  @ApiProperty({ example: 'ADMIN', required: false })
  @Column({ nullable: true })
  code?: string;

  @ApiProperty({ example: 'Administrator role', required: false })
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.role)
  rolePermissions: RolePermission[];
}
