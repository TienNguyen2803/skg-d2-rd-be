
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({ example: 'Active' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
