
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
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { standardPagination } from '../utils/standard-pagination';

@ApiTags('Projects')
@Controller({
  path: 'projects',
  version: '1',
})
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new project' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Project has been successfully created.',
    type: Project,
  })
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get projects list' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get projects list',
    type: [Project],
  })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') filterQuery?: string,
    @Query('sort') sort?: string,
  ) {
    return standardPagination(
      await this.projectsService.findManyWithPagination(
        {
          page,
          limit,
          offset: (page - 1) * limit,
        },
        filterQuery,
        sort,
      ),
      await this.projectsService.standardCount(filterQuery),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get project by id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get project by id',
    type: Project,
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Project has been successfully updated',
    type: Project,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete project' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Project has been successfully deleted',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.softDelete(id);
  }
}
