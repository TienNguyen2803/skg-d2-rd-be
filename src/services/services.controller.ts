
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './entities/service.entity';
import { standardPagination } from '../utils/standard-pagination';

@ApiTags('Services')
@Controller({
  path: 'services',
  version: '1',
})
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new service' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Service has been successfully created.',
    type: Service,
  })
  create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get services list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get services list',
    type: [Service],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') filterQuery?: string,
    @Query('sort.0') sort?: string,
  ) {
    return standardPagination(
      await this.servicesService.findManyWithPagination(
        {
          page,
          limit,
          offset: (page - 1) * limit,
        },
        filterQuery,
        sort,
      ),
      await this.servicesService.standardCount(filterQuery),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get service by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get service by id',
    type: Service,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.servicesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update service' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Service has been successfully updated',
    type: Service,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete service' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Service has been successfully deleted',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.servicesService.softDelete(id);
  }
}
