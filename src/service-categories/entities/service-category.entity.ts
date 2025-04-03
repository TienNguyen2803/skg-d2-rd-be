
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Service } from '../../services/entities/service.entity';

@Entity()
export class ServiceCategory extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  image_url: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ nullable: true })
  order: number;

  @Column({ nullable: true, default: true })
  is_active: boolean;

  @OneToMany(() => Service, (service) => service.service_category, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: false
  })
  services: Service[];
}
