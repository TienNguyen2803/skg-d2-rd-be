
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectType } from './entities/project-type.entity';

@Injectable()
export class ProjectTypesService {
  constructor(
    @InjectRepository(ProjectType)
    private repository: Repository<ProjectType>,
  ) {}

  async findAll() {
    return this.repository.find();
  }
}
