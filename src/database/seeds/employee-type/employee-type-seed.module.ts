
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeType } from 'src/employee-types/entities/employee-type.entity';
import { EmployeeTypeSeedService } from './employee-type-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeType])],
  providers: [EmployeeTypeSeedService],
  exports: [EmployeeTypeSeedService],
})
export class EmployeeTypeSeedModule {}
