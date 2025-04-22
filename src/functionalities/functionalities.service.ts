
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Functionality } from './entities/functionality.entity';

@Injectable()
export class FunctionalitiesService {
  constructor(
    @InjectRepository(Functionality)
    private functionalityRepository: Repository<Functionality>,
  ) {}

  async findAll(): Promise<Functionality[]> {
    return this.functionalityRepository.find({
      where: {
        deleted_at: null,
      },
      order: {
        id: 'ASC',
      },
    });
  }
}
