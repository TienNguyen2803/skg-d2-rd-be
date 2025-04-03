
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';

@Entity()
export class Portal extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  icon: string;

  @Column({ nullable: true })
  description: string;
}
