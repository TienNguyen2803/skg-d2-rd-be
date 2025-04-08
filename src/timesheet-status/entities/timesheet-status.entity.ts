
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class TimesheetStatus extends EntityHelper {
  @PrimaryGeneratedColumn()
  status_id: number;

  @Column({ nullable: true })
  status_name: string;

  @Column({ nullable: true })
  description: string;
}
