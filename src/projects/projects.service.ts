import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterBuilder } from '../utils/filter-builder';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { Department } from 'src/departments/entities/department.entity';
import { User } from 'src/users/entities/user.entity';
import { ProjectType } from './entities/project-type.entity'; // Import ProjectType

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(Department) // Corrected repository injection
    private departmentRepository: Repository<Department>,

    @InjectRepository(User) // Corrected repository injection
    private userRepository: Repository<User>,
    @InjectRepository(ProjectType) // Inject ProjectType repository
    private projectTypeRepository: Repository<ProjectType>,
  ) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectRepository.create(createProjectDto);
    
    // Find project type
    const projectType = await this.projectTypeRepository.findOne({where: {id: createProjectDto.project_type_id}});
    if(!projectType){
        throw new NotFoundException(`Project Type with ID ${createProjectDto.project_type_id} not found`);
    }

    project.project_type = projectType; // Assign project type to project

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
      relations: ['department', 'project_manager', 'project_type'], // Added project_type relation
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
      relations: ['department', 'project_manager', 'project_type'], // Added project_type relation
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['department', 'project_manager', 'project_type'], // Added project_type relation
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    // Update project properties
    Object.assign(project, updateProjectDto);

    // Update project type if provided
    if (updateProjectDto.project_type_id) {
        const projectType = await this.projectTypeRepository.findOne({where: {id: updateProjectDto.project_type_id}});
        if(!projectType){
            throw new NotFoundException(`Project Type with ID ${updateProjectDto.project_type_id} not found`);
        }
        project.project_type = projectType;
    }

    // Update department if provided
    if (updateProjectDto.department_id) {
      const department = await this.departmentRepository.findOne({
        where: { id: updateProjectDto.department_id },
      });
      if (department) {
        project.department = department;
      }
    }

    // Update project manager if provided
    if (updateProjectDto.pm_user_id) {
      const projectManager = await this.userRepository.findOne({
        where: { id: updateProjectDto.pm_user_id },
      });
      if (projectManager) {
        project.project_manager = projectManager;
      }
    }

    // Save the updated project
    await this.projectRepository.save(project);

    // Return updated project with relations
    return this.projectRepository.findOneOrFail({
      where: { id },
      relations: ['department', 'project_manager', 'project_type'], // Added project_type relation
    });
  }

  async softDelete(id: number): Promise<void> {
    await this.projectRepository.softDelete(id);
  }
}