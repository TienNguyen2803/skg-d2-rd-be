
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity()
export class Action extends EntityHelper {
  @PrimaryColumn()
  id: number;

  @Column({ type: String, length: 50, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  description: string;

  @Column({ type: String, length: 50, nullable: true })
  code: string;

  @OneToMany(() => Permission, (permission) => permission.action)
  permissions: Permission[];
}
