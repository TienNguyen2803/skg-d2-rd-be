
import { Column, Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { User } from '../../users/entities/user.entity';
import { Project } from '../../projects/entities/project.entity';
import { TimesheetStatus } from '../../timesheet-status/entities/timesheet-status.entity';
import { TimesheetDetail } from '../../timesheet-details/entities/timesheet-detail.entity';

@Entity()
export class Timesheet extends EntityHelper {
  @PrimaryGeneratedColumn()
  timesheet_id: number;

  @Column({ nullable: true })
  user_id: number;

  @Column({ nullable: true })
  project_id: number;

  @Column({ type: 'date', nullable: true })
  month_year: Date;

  @Column({ nullable: true })
  total_hours: number;

  @Column({ nullable: true })
  status_id: number;

  @Column({ nullable: true })
  reject_reason: string;

  @Column({ type: 'timestamp', nullable: true })
  submitted_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  approved_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Project)
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @ManyToOne(() => TimesheetStatus)
  @JoinColumn({ name: 'status_id' })
  status: TimesheetStatus;

  @OneToMany(() => TimesheetDetail, (detail) => detail.timesheet)
  details: TimesheetDetail[];
}
