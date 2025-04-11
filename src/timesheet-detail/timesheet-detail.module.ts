
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TimesheetDetailService } from './timesheet-detail.service';
import { TimesheetDetailController } from './timesheet-detail.controller';
import { TimesheetDetail } from './entities/timesheet-detail.entity';
import { Timesheet } from 'src/timesheet/entities/timesheet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimesheetDetail, Timesheet])],
  controllers: [TimesheetDetailController],
  providers: [TimesheetDetailService],
  exports: [TimesheetDetailService],
})
export class TimesheetDetailModule { }
