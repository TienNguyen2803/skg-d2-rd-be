
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
import { SiteConfigurationsService } from './site-configurations.service';
import { CreateSiteConfigurationDto } from './dto/create-site-configuration.dto';
import { UpdateSiteConfigurationDto } from './dto/update-site-configuration.dto';
import { standardPagination } from '../utils/standard-pagination';

@ApiTags('Site Configurations')
@Controller({
  path: 'site-configurations',
  version: '1',
})
export class SiteConfigurationsController {
  constructor(private readonly siteConfigurationsService: SiteConfigurationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new site configuration' })
  create(@Body() createSiteConfigurationDto: CreateSiteConfigurationDto) {
    return this.siteConfigurationsService.create(createSiteConfigurationDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get site configurations list' })
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') filterQuery?: string,
    @Query('sort') sort?: string,
  ) {
    return standardPagination(
      await this.siteConfigurationsService.findManyWithPagination(
        { page, limit, offset: (page - 1) * limit },
        filterQuery,
        sort,
      ),
      await this.siteConfigurationsService.standardCount(filterQuery),
    );
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get site configuration by id' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.siteConfigurationsService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update site configuration' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSiteConfigurationDto: UpdateSiteConfigurationDto,
  ) {
    return this.siteConfigurationsService.update(id, updateSiteConfigurationDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete site configuration' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.siteConfigurationsService.softDelete(id);
  }
}
