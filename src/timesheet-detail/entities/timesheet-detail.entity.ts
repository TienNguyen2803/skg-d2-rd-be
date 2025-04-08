
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Timesheet } from '../../timesheet/entities/timesheet.entity';

@Entity()
export class TimesheetDetail extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Date, nullable: true })
  date: Date;

  @Column({ type: String, nullable: true })
  start_time: string;

  @Column({ type: String, nullable: true })
  end_time: string;

  @Column({ type: Number, nullable: true })
  ot_hours: number;

  @Column({ type: String, nullable: true })
  description: string;

  @ManyToOne(() => Timesheet, (timesheet) => timesheet.details, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  @JoinColumn({ name: 'timesheet_id' })
  timesheet: Timesheet;

  @Column({ type: Number, nullable: true })
  timesheet_id: number;
}
