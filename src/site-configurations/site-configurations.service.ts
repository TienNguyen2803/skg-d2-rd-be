
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

  async create(createSiteConfigurationDto: CreateSiteConfigurationDto): Promise<SiteConfiguration> {
    const siteConfiguration = this.siteConfigurationRepository.create({
      ...createSiteConfigurationDto,
      logo_path: createSiteConfigurationDto.logo_path ? `/uploads/${createSiteConfigurationDto.logo_path}` : null,
      favicon_path: createSiteConfigurationDto.favicon_path ? `/uploads/${createSiteConfigurationDto.favicon_path}` : null,
      footer_logo_path: createSiteConfigurationDto.footer_logo_path ? `/uploads/${createSiteConfigurationDto.footer_logo_path}` : null,
    });
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
    
    const updatedData = {
      ...updateSiteConfigurationDto,
      logo_path: updateSiteConfigurationDto.logo_path ? `/uploads/${updateSiteConfigurationDto.logo_path}` : siteConfiguration.logo_path,
      favicon_path: updateSiteConfigurationDto.favicon_path ? `/uploads/${updateSiteConfigurationDto.favicon_path}` : siteConfiguration.favicon_path,
      footer_logo_path: updateSiteConfigurationDto.footer_logo_path ? `/uploads/${updateSiteConfigurationDto.footer_logo_path}` : siteConfiguration.footer_logo_path,
    };
    
    Object.assign(siteConfiguration, updatedData);
    return this.siteConfigurationRepository.save(siteConfiguration);
  }

  async softDelete(id: number) {
    await this.findOne(id);
    await this.siteConfigurationRepository.softDelete(id);
  }
}
