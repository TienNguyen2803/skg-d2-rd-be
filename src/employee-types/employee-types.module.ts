
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeType } from './entities/employee-type.entity';
import { EmployeeTypesController } from './employee-types.controller';
import { EmployeeTypesService } from './employee-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeType])],
  controllers: [EmployeeTypesController],
  providers: [EmployeeTypesService],
  exports: [EmployeeTypesService],
})
export class EmployeeTypesModule {}
