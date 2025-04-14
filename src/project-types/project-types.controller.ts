
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ProjectTypesService } from './project-types.service';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@ApiTags('Project Types')
@Controller({
  path: 'project-types',
  version: '1',
})
export class ProjectTypesController {
  constructor(private readonly projectTypesService: ProjectTypesService) {}

  @Get()
  findAll() {
    return this.projectTypesService.findAll();
  }
}
