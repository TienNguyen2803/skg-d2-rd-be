
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Department extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  description: string;

  @Column({ type: Number, nullable: true })
  manager_id: number;

  @OneToMany(() => User, (user) => user.department)
  users: User[];
}
