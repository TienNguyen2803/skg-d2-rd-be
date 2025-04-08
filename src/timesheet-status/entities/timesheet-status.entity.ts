
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Timesheet } from '../../timesheet/entities/timesheet.entity';

@Entity()
export class TimesheetStatus extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  code: string;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  description: string;

  @OneToMany(() => Timesheet, (timesheet) => timesheet.status)
  timesheets: Timesheet[];
}
