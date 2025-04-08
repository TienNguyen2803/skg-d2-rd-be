
import { Column, Entity, OneToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Department extends EntityHelper {
  @PrimaryGeneratedColumn()
  department_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  manager_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'manager_id' })
  manager: User;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
