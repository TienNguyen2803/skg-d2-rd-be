
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TimesheetStatus } from 'src/timesheet-status/entities/timesheet-status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimesheetStatusSeedService {
  constructor(
    @InjectRepository(TimesheetStatus)
    private repository: Repository<TimesheetStatus>,
  ) {}

  async run() {
    const count = await this.repository.count();

    if (!count) {
      await this.repository.save([
        this.repository.create({
          id: 1,
          code: 'DRAFT',
          name: 'Draft',
          description: 'Timesheet tạo chưa approve',
        }),
        this.repository.create({
          id: 2,
          code: 'WAITING_FOR_APPROVE',
          name: 'WAITING_FOR_APPROVE',
          description: 'Timesheet chờ approve',
        }),
        this.repository.create({
          id: 3,
          code: 'APPROVED',
          name: 'APPROVED', 
          description: 'Timesheet đã approve',
        }),
        this.repository.create({
          id: 4,
          code: 'REJECT',
          name: 'REJECT',
          description: 'Timesheet cần chỉnh sửa nội dung',
        }),
      ]);
    }
  }
}
