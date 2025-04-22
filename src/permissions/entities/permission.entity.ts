
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Functionality } from '../../functionalities/entities/functionality.entity';
import { Action } from '../../actions/entities/action.entity';
import { RolePermission } from 'src/role-permissions/entities/role-permission.entity';

@Entity()
export class Permission extends EntityHelper {
  @PrimaryColumn()
  id: number;

  @ManyToOne(() => Functionality, (functionality) => functionality.permissions, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'functionality_id' })
  functionality: Functionality;

  @Column({ type: Number, nullable: false })
  functionality_id: number;

  @ManyToOne(() => Action, (action) => action.permissions, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'action_id' })
  action: Action;

  @Column({ type: Number, nullable: false })
  action_id: number;

  @Column({ type: String, length: 150, nullable: false, unique: true })
  name: string;

  @Column({ type: String, nullable: true })
  description: string;

  @OneToMany(() => RolePermission, (rolePermission) => rolePermission.permission)
  rolePermissions: RolePermission[];
}
