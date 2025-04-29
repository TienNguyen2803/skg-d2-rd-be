
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { Timesheet } from 'src/timesheet/entities/timesheet.entity';

@Entity()
export class Department extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  code: string;

  @Column({ type: String, nullable: true })
  description: string;

  @OneToMany(() => User, (user) => user.department)
  users: User[];

  @OneToMany(() => Project, (project) => project.department)
  projects: Project[];

  @OneToMany(() => Timesheet, (t) => t.department)
  timesheets: Timesheet[];
}
