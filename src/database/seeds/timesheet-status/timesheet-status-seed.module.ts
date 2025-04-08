
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesheetStatus } from 'src/timesheet-status/entities/timesheet-status.entity';
import { TimesheetStatusSeedService } from './timesheet-status-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([TimesheetStatus])],
  providers: [TimesheetStatusSeedService],
  exports: [TimesheetStatusSeedService],
})
export class TimesheetStatusSeedModule {}
