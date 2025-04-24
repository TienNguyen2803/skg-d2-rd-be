
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Permission } from '../../permissions/entities/permission.entity';

@Entity()
export class Functionality extends EntityHelper {
  @PrimaryColumn()
  id: number;

  @Column({ type: String, length: 100, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  description: string;

  @Column({ type: String, nullable: true })
  resource: string;

  @OneToMany(() => Permission, (permission) => permission.functionality)
  permissions: Permission[];
}
