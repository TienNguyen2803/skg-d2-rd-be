
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { TimesheetDetailService } from './timesheet-detail.service';
import { CreateTimesheetDetailDto } from './dto/create-timesheet-detail.dto';
import { UpdateTimesheetDetailDto } from './dto/update-timesheet-detail.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { TimesheetDetail } from './entities/timesheet-detail.entity';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Timesheet Detail')
@Controller({
  path: 'timesheet-detail',
  version: '1',
})
export class TimesheetDetailController {
  constructor(private readonly timesheetDetailService: TimesheetDetailService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new Timesheet Detail' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'TimesheetDetail has been successfully created.',
    type: TimesheetDetail,
  })
  create(@Body() createTimesheetDetailDto: CreateTimesheetDetailDto): Promise<TimesheetDetail> {
    console.log('createTimesheetDetailDto', createTimesheetDetailDto)
    return this.timesheetDetailService.create(createTimesheetDetailDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('s') s: string,
  ) {
    return this.timesheetDetailService.findAll({
      page,
      limit,
      offset: (page - 1) * limit,
    }, s);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.timesheetDetailService.findOne(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTimesheetDetailDto: UpdateTimesheetDetailDto,
  ) {
    return this.timesheetDetailService.update(id, updateTimesheetDetailDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.timesheetDetailService.remove(id);
  }
}
