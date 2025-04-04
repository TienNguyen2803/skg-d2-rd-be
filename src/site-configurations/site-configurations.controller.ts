
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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { extname } from 'path';
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
        { name: 'footer_logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const fileExtName = extname(file.originalname);
            callback(null, `${randomStringGenerator()}${fileExtName}`);
          },
        }),
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif|ico)$/i)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
      },
    ),
  )
  async create(
    @Body() createSiteConfigurationDto: CreateSiteConfigurationDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
      footer_logo?: Express.Multer.File[];
    },
  ) {
    const dto = {
      ...createSiteConfigurationDto,
      logo_path: files.logo?.[0]?.filename,
      favicon_path: files.favicon?.[0]?.filename,
      footer_logo_path: files.footer_logo?.[0]?.filename,
    };
    
    return this.siteConfigurationsService.create(dto);
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
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'logo', maxCount: 1 },
        { name: 'favicon', maxCount: 1 },
        { name: 'footer_logo', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, callback) => {
            const fileExtName = extname(file.originalname);
            callback(null, `${randomStringGenerator()}${fileExtName}`);
          },
        }),
        fileFilter: (req, file, callback) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif|ico)$/i)) {
            return callback(new Error('Only image files are allowed!'), false);
          }
          callback(null, true);
        },
      },
    ),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSiteConfigurationDto: UpdateSiteConfigurationDto,
    @UploadedFiles()
    files: {
      logo?: Express.Multer.File[];
      favicon?: Express.Multer.File[];
      footer_logo?: Express.Multer.File[];
    },
  ) {
    const dto = {
      ...updateSiteConfigurationDto,
      logo_path: files.logo?.[0]?.filename,
      favicon_path: files.favicon?.[0]?.filename,
      footer_logo_path: files.footer_logo?.[0]?.filename,
    };

    return this.siteConfigurationsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete site configuration' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.siteConfigurationsService.softDelete(id);
  }
}
