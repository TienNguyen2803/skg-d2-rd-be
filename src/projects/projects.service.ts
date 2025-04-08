
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterBuilder } from '../utils/filter-builder';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    return this.projectRepository.save(project);
  }

  async findManyWithPagination(
    { page, limit, offset }: IPaginationOptions,
    filterQuery?: string,
    sort?: string,
  ) {
    const findOptions = {
      ...FilterBuilder.buildFilter(filterQuery),
      skip: offset,
      take: limit,
      relations: ['department', 'project_manager'],
      order: {}
    };

    if (sort) {
      const [field, direction] = sort.split(',');
      if (field && direction) {
        const upperDirection = direction.toUpperCase();
        if (upperDirection === 'ASC' || upperDirection === 'DESC') {
          findOptions.order = { [field]: upperDirection };
        }
      }
    } else {
      findOptions.order = { id: 'DESC' };
    }

    return this.projectRepository.find(findOptions);
  }

  standardCount(filterQuery?: string): Promise<number> {
    const findOptions = FilterBuilder.buildFilter(filterQuery);
    return this.projectRepository.count(findOptions);
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['department', 'project_manager'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    let project = await this.projectRepository.findOne({
      where: { id },
      relations: ['department', 'project_manager'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Create new project object with updated values
    project = {
      ...project,
      ...updateProjectDto,
    };

    // Save the updated project
    const savedProject = await this.projectRepository.save(project);

    // Return updated project with relations
    return this.projectRepository.findOne({
      where: { id: savedProject.id },
      relations: ['department', 'project_manager'],
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.projectRepository.softDelete(id);
  }
}
