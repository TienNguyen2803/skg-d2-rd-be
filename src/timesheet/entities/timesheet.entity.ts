
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Project } from '../../projects/entities/project.entity';
import { Department } from '../../departments/entities/department.entity';
import { TimesheetStatus } from '../../timesheet-status/entities/timesheet-status.entity';
import { TimesheetDetail } from '../../timesheet-detail/entities/timesheet-detail.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Timesheet extends EntityHelper {
  @ManyToOne(() => User, (user) => user.timesheets, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Column({ type: Number, nullable: true })
  creator_id: number;
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  month_year: string;

  @Column({ type: 'double precision', nullable: true })
  total_hours: number;

  @Column({ type: String, nullable: true })
  reject_reason: string;

  @ManyToOne(() => Project, (project) => project.timesheets, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column({ type: Number, nullable: true })
  project_id: number;

  @ManyToOne(() => Department, (department) => department.timesheets, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @Column({ type: Number, nullable: true })
  department_id: number;

  @ManyToOne(() => TimesheetStatus, (status) => status.timesheets, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'status_id' })
  status: TimesheetStatus;

  @Column({ type: Number, nullable: true })
  status_id: number;

  @OneToMany(() => TimesheetDetail, (detail) => detail.timesheet)
  details: TimesheetDetail[];
}
