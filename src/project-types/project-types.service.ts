
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterBuilder } from 'src/utils/filter-builder';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { ProjectType } from './entities/project-type.entity';

@Injectable()
export class ProjectTypesService {
  constructor(
    @InjectRepository(ProjectType)
    private repository: Repository<ProjectType>,
  ) { }

  async findManyWithPagination(
    { page, limit, offset }: IPaginationOptions,
    filterQuery?: string,
    sort?: string,
  ) {
    const findOptions = {
      ...FilterBuilder.buildFilter(filterQuery),
      skip: offset,
      take: limit,
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

    return this.repository.find(findOptions);
  }

  standardCount(filterQuery?: string): Promise<number> {
    const findOptions = FilterBuilder.buildFilter(filterQuery);
    return this.repository.count(findOptions);
  }
}
