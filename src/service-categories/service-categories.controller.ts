
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ServiceCategoriesService } from './service-categories.service';
import { CreateServiceCategoryDto } from './dto/create-service-category.dto';
import { UpdateServiceCategoryDto } from './dto/update-service-category.dto';
import { ServiceCategory } from './entities/service-category.entity';
import { standardPagination } from '../utils/standard-pagination';

@ApiTags('Service Categories')
@Controller({
  path: 'service-categories',
  version: '1',
})
export class ServiceCategoriesController {
  constructor(private readonly serviceCategoriesService: ServiceCategoriesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new service category' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Service category has been successfully created.',
    type: ServiceCategory,
  })
  create(@Body() createServiceCategoryDto: CreateServiceCategoryDto): Promise<ServiceCategory> {
    return this.serviceCategoriesService.create(createServiceCategoryDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get service categories list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get service categories list',
    type: [ServiceCategory],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') filterQuery?: string,
    @Query('sort.0') sort?: string,
  ) {
    return standardPagination(
      await this.serviceCategoriesService.findManyWithPagination(
        {
          page,
          limit,
          offset: (page - 1) * limit,
        },
        filterQuery,
        sort,
      ),
      await this.serviceCategoriesService.standardCount(filterQuery),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get service category by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get service category by id',
    type: ServiceCategory,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.serviceCategoriesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update service category' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service category has been successfully updated',
    type: ServiceCategory,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceCategoryDto: UpdateServiceCategoryDto,
  ): Promise<ServiceCategory> {
    return this.serviceCategoriesService.update(id, updateServiceCategoryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete service category' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Service category has been successfully deleted',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.serviceCategoriesService.softDelete(id);
  }
}
