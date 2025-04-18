
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { Department } from '../../departments/entities/department.entity';
import { Timesheet } from 'src/timesheet/entities/timesheet.entity';
import { ProjectType } from '../../project-types/entities/project-type.entity';

@Entity()
export class Project extends EntityHelper {
  @ManyToOne(() => ProjectType, {
    eager: false
  })
  @JoinColumn({ name: 'project_type_id' })
  project_type: ProjectType;

  @Column({ type: Number, nullable: true })
  project_type_id: number;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  description: string;

  @ManyToOne(() => Department, (department) => department.projects, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ type: Number, nullable: true })
  department_id: number;

  @ManyToOne(() => User, (user) => user.managed_projects, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'pm_user_id' })
  project_manager: User;

  @Column({ type: Number, nullable: true })
  pm_user_id: number;

  @OneToMany(() => Timesheet, (t) => t.project)
  timesheets: Timesheet[];
}
