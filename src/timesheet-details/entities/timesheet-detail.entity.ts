
import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Timesheet } from '../../timesheets/entities/timesheet.entity';

@Entity()
export class TimesheetDetail extends EntityHelper {
  @PrimaryGeneratedColumn()
  detail_id: number;

  @Column({ nullable: true })
  timesheet_id: number;

  @Column({ type: 'date', nullable: true })
  work_date: Date;

  @Column({ type: 'time', nullable: true })
  start_time: string;

  @Column({ type: 'time', nullable: true })
  end_time: string;

  @Column({ nullable: true })
  ot_hours: number;

  @Column({ nullable: true })
  ot_type: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Timesheet, (timesheet) => timesheet.details)
  @JoinColumn({ name: 'timesheet_id' })
  timesheet: Timesheet;
}
