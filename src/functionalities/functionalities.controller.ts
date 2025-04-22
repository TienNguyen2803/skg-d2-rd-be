
import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  async findAll() {
    return await this.functionalitiesService.findAll();
  }
}
