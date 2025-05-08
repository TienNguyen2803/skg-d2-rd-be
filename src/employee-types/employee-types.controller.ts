
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { EmployeeTypesService } from './employee-types.service';
import { CreateEmployeeTypeDto } from './dto/create-employee-type.dto';
import { UpdateEmployeeTypeDto } from './dto/update-employee-type.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmployeeType } from './entities/employee-type.entity';
import { standardPagination } from '../utils/standard-pagination';

@ApiTags('Employee Types')
@Controller({
  path: 'employee-types',
  version: '1',
})
export class EmployeeTypesController {
  constructor(private readonly employeeTypesService: EmployeeTypesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new employee type' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Employee type has been successfully created.',
    type: EmployeeType,
  })
  create(@Body() createEmployeeTypeDto: CreateEmployeeTypeDto): Promise<EmployeeType> {
    return this.employeeTypesService.create(createEmployeeTypeDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get employee type list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get employee type list',
    type: [EmployeeType],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') search?: string,
  ) {
    return standardPagination(
      await this.employeeTypesService.findManyWithPagination({
        page,
        limit,
        offset: (page - 1) * limit,
      }, search),
      await this.employeeTypesService.standardCount(search),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get employee type by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get employee type by id',
    type: EmployeeType,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.employeeTypesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update employee type' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Employee type has been successfully updated',
    type: EmployeeType,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEmployeeTypeDto: UpdateEmployeeTypeDto,
  ): Promise<EmployeeType> {
    return this.employeeTypesService.update(id, updateEmployeeTypeDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete employee type' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Employee type has been successfully deleted',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.employeeTypesService.softDelete(id);
  }
}
