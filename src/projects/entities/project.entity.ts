
import { Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Department } from '../../departments/entities/department.entity';

@Entity()
export class Project extends EntityHelper {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  department_id: number;

  @Column({ type: 'timestamp', nullable: true })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  end_date: Date;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}
