
import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeTypeDto } from './create-employee-type.dto';

export class UpdateEmployeeTypeDto extends PartialType(CreateEmployeeTypeDto) {}
