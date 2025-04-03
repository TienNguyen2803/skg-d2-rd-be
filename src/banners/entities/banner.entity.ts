
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { SpaInfo } from '../../spa-info/entities/spa-info.entity';

@Entity()
export class Banner extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_url: string;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column()
  order: number;

  @Column()
  is_active: boolean;

  @Column()
  type: number;

  @ManyToOne(() => SpaInfo, (spaInfo) => spaInfo.banners, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn({ name: 'spa_info_id' })
  spa_info: SpaInfo;

  @Column()
  spa_info_id: number;
}
