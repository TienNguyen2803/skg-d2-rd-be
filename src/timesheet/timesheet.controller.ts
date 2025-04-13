import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  Param,
  ParseIntPipe,
  HttpStatus,
  Patch,
  Res,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { TimesheetService } from './timesheet.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from '../roles/roles.decorator';
import { RoleEnum } from '../roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../roles/roles.guard';
import { CurrentUser } from '../decorators/user/current-user.decorator';
import { UpdateTimesheetStatusDto } from './dto/update-timesheet-status.dto';
import { UpdateTimesheetRejectDto } from './dto/update-timesheet-reject.dto';

@ApiBearerAuth()
@Roles(RoleEnum.user, RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Timesheet')
@Controller({
  path: 'timesheets',
  version: '1',
})
export class TimesheetController {
  constructor(private readonly timesheetService: TimesheetService) { }

  @Post()
  create(@Body() createTimesheetDto: CreateTimesheetDto, @CurrentUser() user) {
    return this.timesheetService.create(createTimesheetDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user) {
    const isAdmin = user.role?.id === RoleEnum.admin;
    return this.timesheetService.findAll(user.id, isAdmin);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.timesheetService.findOne(id);
  }

  @Patch(':id/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update timesheet status' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Status has been successfully updated.',
  })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateTimesheetStatusDto,
  ) {
    return this.timesheetService.updateStatus(id, updateStatusDto.status_code);
  }

  @Patch(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update timesheet reject reason' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reject reason has been successfully updated.',
  })
  async updateRejectReason(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRejectDto: UpdateTimesheetRejectDto,
  ) {
    return this.timesheetService.updateRejectReason(id, updateRejectDto.reject_reason);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete timesheet and related details' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Timesheet has been successfully deleted',
  })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.timesheetService.remove(id);
  }

  @Get('/export-excel/:month_year')
  async exportExcel(
    @Param('month_year') month_year: string,
    @Res() res: Response
  ): Promise<Response> {
    return this.timesheetService.exportToExcel(res, month_year);
  }
}