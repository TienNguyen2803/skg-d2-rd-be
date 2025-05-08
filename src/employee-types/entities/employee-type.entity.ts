
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';

@Entity()
export class EmployeeType extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  code: string;

  @Column({ type: String })
  name: string;

  @Column({ type: 'double precision', nullable: true })
  resource_effort: number;

  @OneToMany(() => User, (user) => user.employee_type)
  users: User[];
}
