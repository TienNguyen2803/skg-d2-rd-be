
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterBuilder } from 'src/utils/filter-builder';
import { IPaginationOptions } from 'src/utils/types/pagination-options';
import { Repository } from 'typeorm';
import { CreatePortalDto } from './dto/create-portal.dto';
import { UpdatePortalDto } from './dto/update-portal.dto';
import { Portal } from './entities/portal.entity';

@Injectable()
export class PortalsService {
  constructor(
    @InjectRepository(Portal)
    private portalRepository: Repository<Portal>,
  ) {}

  create(createPortalDto: CreatePortalDto): Promise<Portal> {
    const portal = this.portalRepository.create(createPortalDto);
    return this.portalRepository.save(portal);
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

    return this.portalRepository.find(findOptions);
  }

  standardCount(filterQuery?: string): Promise<number> {
    const findOptions = FilterBuilder.buildFilter(filterQuery);
    return this.portalRepository.count(findOptions);
  }

  async findOne(id: number): Promise<Portal> {
    const portal = await this.portalRepository.findOneBy({ id });
    if (!portal) {
      throw new NotFoundException(`Portal with ID ${id} not found`);
    }
    return portal;
  }

  async update(id: number, updatePortalDto: UpdatePortalDto): Promise<Portal> {
    const portal = await this.findOne(id);
    Object.assign(portal, updatePortalDto);
    return this.portalRepository.save(portal);
  }

  async softDelete(id: number): Promise<void> {
    await this.portalRepository.softDelete(id);
  }
}
