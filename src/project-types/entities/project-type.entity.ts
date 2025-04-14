
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { EntityHelper } from '../../utils/entity-helper';
import { Project } from '../../projects/entities/project.entity';

@Entity()
export class ProjectType extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  code: string;

  @Column({ type: String, nullable: true })
  name: string;

  @Column({ type: String, nullable: true })
  description: string;

  @OneToMany(() => Project, (project) => project.project_type)
  projects: Project[];
}
