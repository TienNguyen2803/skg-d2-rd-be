
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './entities/project.entity';
import { ProjectType } from 'src/project-types/entities/project-type.entity';
import { DepartmentsModule } from '../departments/departments.module';
import { User } from '../users/entities/user.entity';
import { Department } from 'src/departments/entities/department.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectType, User, Department]),
    DepartmentsModule
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule { }
