
import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, ParseIntPipe, Query, DefaultValuePipe } from '@nestjs/common';
import { StatusesService } from './statuses.service';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Status } from './entities/status.entity';
import { standardPagination } from '../utils/standard-pagination';

@ApiTags('Statuses')
@Controller({
  path: 'statuses',
  version: '1',
})
export class StatusesController {
  constructor(private readonly statusesService: StatusesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new status' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Status has been successfully created.',
    type: Status,
  })
  create(@Body() createStatusDto: CreateStatusDto): Promise<Status> {
    return this.statusesService.create(createStatusDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get status list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get status list',
    type: [Status],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') search?: string,
  ) {
    return standardPagination(
      await this.statusesService.findManyWithPagination({
        page,
        limit,
        offset: (page - 1) * limit,
      }, search),
      await this.statusesService.standardCount(search),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get status by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get status by id',
    type: Status,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.statusesService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status has been successfully updated',
    type: Status,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<Status> {
    return this.statusesService.update(id, updateStatusDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete status' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Status has been successfully deleted',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.statusesService.softDelete(id);
  }
}
