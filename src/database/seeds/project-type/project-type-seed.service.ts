
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectType } from 'src/project-types/entities/project-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectTypeSeedService {
  constructor(
    @InjectRepository(ProjectType)
    private repository: Repository<ProjectType>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          code: 'FIX_PRICE',
          name: 'Fixed Price',
          description: 'FIX_PRICE',
        }),
        this.repository.create({
          code: 'OSDC',
          name: 'OSDC',
          description: 'OSDC',
        }),
      ]);
    }
  }
}
