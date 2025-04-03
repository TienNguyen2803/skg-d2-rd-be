
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategory } from './entities/service-category.entity';
import { FilterBuilder } from '../utils/filter-builder';
import { IPaginationOptions } from '../utils/types/pagination-options';

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectRepository(ServiceCategory)
    private serviceCategoryRepository: Repository<ServiceCategory>,
  ) { }

  async create(createServiceCategoryDto: CreateServiceCategoryDto): Promise<ServiceCategory> {
    const serviceCategory = this.serviceCategoryRepository.create(createServiceCategoryDto);
    return this.serviceCategoryRepository.save(serviceCategory);
  }

  async findManyWithPagination(
    { page, limit, offset }: IPaginationOptions,
    filterQuery?: string,
    sort?: string,
  ) {
    console.log(filterQuery)
    const findOptions = {
      ...FilterBuilder.buildFilter(filterQuery),
      skip: offset,
      take: limit,
      relations: ['services'],
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

    return this.serviceCategoryRepository.find(findOptions);
  }

  standardCount(filterQuery?: string): Promise<number> {
    const findOptions = FilterBuilder.buildFilter(filterQuery);
    return this.serviceCategoryRepository.count(findOptions);
  }

  async findOne(id: number): Promise<ServiceCategory> {
    const serviceCategory = await this.serviceCategoryRepository.findOne({
      where: { id },
      relations: ['services'],
    });

    if (!serviceCategory) {
      throw new NotFoundException(`Service category with ID ${id} not found`);
    }

    return serviceCategory;
  }

  async update(id: number, updateServiceCategoryDto: UpdateServiceCategoryDto): Promise<ServiceCategory> {
    const serviceCategory = await this.findOne(id);
    Object.assign(serviceCategory, updateServiceCategoryDto);
    return this.serviceCategoryRepository.save(serviceCategory);
  }

  async softDelete(id: number): Promise<void> {
    await this.findOne(id); // Check if exists
    await this.serviceCategoryRepository.softDelete(id);
  }
}
