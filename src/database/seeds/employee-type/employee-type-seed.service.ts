
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeType } from 'src/employee-types/entities/employee-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeTypeSeedService {
  constructor(
    @InjectRepository(EmployeeType)
    private repository: Repository<EmployeeType>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          code: 'PART_TIME',
          name: 'Nhân viên part',
          resource_effort: 0.5,
        }),
        this.repository.create({
          code: 'INTERN',
          name: 'Nhân viên intern',
          resource_effort: 0.25,
        }),
        this.repository.create({
          code: 'OFFICAL',
          name: 'Nhân viên chính thức',
          resource_effort: 1,
        }),
      ]);
    }
  }
}
