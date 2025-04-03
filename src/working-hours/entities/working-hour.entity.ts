
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { SpaInfo } from '../../spa-info/entities/spa-info.entity';

@Entity()
export class WorkingHour extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  day_of_week: string;

  @Column()
  opening_time: string;

  @Column()
  closing_time: string;

  @Column({ default: false })
  is_closed: boolean;

  @ManyToOne(() => SpaInfo, (spaInfo) => spaInfo.workingHours, {
    onDelete: 'CASCADE',
    nullable: false,
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'spa_info_id' })
  spa_info: SpaInfo;

  @Column()
  spa_info_id: number;
}
