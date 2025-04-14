
import { Controller, DefaultValuePipe, Get, HttpCode, HttpStatus, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProjectTypesService } from './project-types.service';
import { ProjectType } from './entities/project-type.entity';
import { standardPagination } from 'src/utils/standard-pagination';

@ApiBearerAuth()
@ApiTags('Project Types')
@Controller({
  path: 'project-types',
  version: '1',
})
export class ProjectTypesController {
  constructor(private readonly projectTypesService: ProjectTypesService) { }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get projects types list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get projects types list',
    type: [ProjectType],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') filterQuery?: string,
    @Query('sort') sort?: string,
  ) {
    return standardPagination(
      await this.projectTypesService.findManyWithPagination(
        {
          page,
          limit,
          offset: (page - 1) * limit,
        },
        filterQuery,
        sort,
      ),
      await this.projectTypesService.standardCount(filterQuery),
    );
  }
}
