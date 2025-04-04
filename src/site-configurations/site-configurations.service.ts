
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSiteConfigurationDto } from './dto/create-site-configuration.dto';
import { UpdateSiteConfigurationDto } from './dto/update-site-configuration.dto';
import { SiteConfiguration } from './entities/site-configuration.entity';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { FilterBuilder } from '../utils/filter-builder';

@Injectable()
export class SiteConfigurationsService {
  constructor(
    @InjectRepository(SiteConfiguration)
    private siteConfigurationRepository: Repository<SiteConfiguration>,
  ) {}

  create(createSiteConfigurationDto: CreateSiteConfigurationDto) {
    const siteConfiguration = this.siteConfigurationRepository.create(createSiteConfigurationDto);
    return this.siteConfigurationRepository.save(siteConfiguration);
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
      order: sort ? { [sort.split(',')[0]]: sort.split(',')[1] } : { id: 'DESC' },
    };

    return this.siteConfigurationRepository.find(findOptions);
  }

  standardCount(filterQuery?: string) {
    const findOptions = FilterBuilder.buildFilter(filterQuery);
    return this.siteConfigurationRepository.count(findOptions);
  }

  async findOne(id: number) {
    const siteConfiguration = await this.siteConfigurationRepository.findOne({
      where: { id },
    });

    if (!siteConfiguration) {
      throw new NotFoundException(`Site configuration with ID ${id} not found`);
    }

    return siteConfiguration;
  }

  async update(id: number, updateSiteConfigurationDto: UpdateSiteConfigurationDto) {
    const siteConfiguration = await this.findOne(id);
    Object.assign(siteConfiguration, updateSiteConfigurationDto);
    return this.siteConfigurationRepository.save(siteConfiguration);
  }

  async softDelete(id: number) {
    await this.findOne(id);
    await this.siteConfigurationRepository.softDelete(id);
  }
}
