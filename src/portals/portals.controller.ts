
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PortalsService } from './portals.service';
import { CreatePortalDto } from './dto/create-portal.dto';
import { UpdatePortalDto } from './dto/update-portal.dto';
import { Portal } from './entities/portal.entity';
import { standardPagination } from '../utils/standard-pagination';

@ApiTags('Portals')
@Controller({
  path: 'portals',
  version: '1',
})
export class PortalsController {
  constructor(private readonly portalsService: PortalsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new portal' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Portal has been successfully created.',
    type: Portal,
  })
  create(@Body() createPortalDto: CreatePortalDto): Promise<Portal> {
    return this.portalsService.create(createPortalDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get portal list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get portal list',
    type: [Portal],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') filterQuery?: string,
    @Query('sort') sort?: string,
  ) {
    return standardPagination(
      await this.portalsService.findManyWithPagination(
        {
          page,
          limit,
          offset: (page - 1) * limit,
        },
        filterQuery,
        sort,
      ),
      await this.portalsService.standardCount(filterQuery),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get portal by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get portal by id',
    type: Portal,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.portalsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update portal' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Portal has been successfully updated',
    type: Portal,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePortalDto: UpdatePortalDto,
  ): Promise<Portal> {
    return this.portalsService.update(id, updatePortalDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete portal' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Portal has been successfully deleted',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.portalsService.softDelete(id);
  }
}
