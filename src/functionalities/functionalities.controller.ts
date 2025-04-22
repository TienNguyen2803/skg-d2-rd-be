import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Functionality } from './entities/functionality.entity';
import { FunctionalitiesService } from './functionalities.service';

@ApiTags('Functionalities')
@Controller({
  path: 'functionalities',
  version: '1',
})
export class FunctionalitiesController {
  constructor(private readonly functionalitiesService: FunctionalitiesService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get functionalities list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get functionalities list',
    type: [Functionality],
  })
  @ApiQuery({ name: 'role_id', required: false, type: Number })
  async findAll(@Query('role_id') role_id?: number): Promise<Functionality[]> {
    return await this.functionalitiesService.findAll(role_id);
  }
}