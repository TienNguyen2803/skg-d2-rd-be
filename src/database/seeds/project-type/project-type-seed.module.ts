
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectType } from 'src/project-types/entities/project-type.entity';
import { ProjectTypeSeedService } from './project-type-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectType])],
  providers: [ProjectTypeSeedService],
  exports: [ProjectTypeSeedService],
})
export class ProjectTypeSeedModule {}
