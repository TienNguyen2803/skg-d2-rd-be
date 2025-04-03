
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { ServiceCategory } from '../../service-categories/entities/service-category.entity';

@Entity()
export class Service extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  category_id: number;

  @Column({ nullable: true })
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  image_url: string;

  @Column('decimal', { nullable: true, precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  duration_minutes: number;

  @Column('text', { nullable: true })
  benefits: string;

  @Column({ nullable: true, default: true })
  is_active: boolean;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @ManyToOne(() => ServiceCategory, (category) => category.services)
  @JoinColumn({ name: 'service_category_id' })
  service_category: Service;

  @Column()
  service_category_id: number;
}
