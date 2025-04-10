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
  NotFoundException,
  InternalServerErrorException,
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
import * as ExcelJS from 'exceljs';
import * as fs from 'fs';
import * as path from 'path'

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

  @Get('/export-excel/xxx')
  async exportExcel(@Res() res: Response): Promise<Response> {
    try {
      const templatePath = path.join(
        process.cwd(),
        'src',
        'template',
        'template.xlsx',
      );

      if (!fs.existsSync(templatePath)) {
        throw new NotFoundException('Template file not found');
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(templatePath);

      // Get all worksheet names for debugging
      const worksheetNames = workbook.worksheets.map(ws => ws.name);
      console.log('Available worksheets:', worksheetNames);

      // Get worksheet by name
      const worksheet = workbook.getWorksheet('01.Summary');
      if (!worksheet) {
        throw new NotFoundException('Excel worksheet not found');
      }

      const data = [
        {
          "id": 1,
          "department": "Operation",
          "project": "S-CORE",
          "project_type": "Fixed Price",
          "employee_id": "HauHT",
          "full_name": "Hoàng Thị Hậu",
          "weekday_overtime_hours": 10.00,
          "weekday_night_overtime_hours": 3.00,
          "sunday_night_overtime_hours": 5.00,
          "holiday_overtime_hours": 0.00,
          "total_overtime_hours": 31.00,
          "sheet_name": "HauHT",
          "hyperlink": "Link",
          "paid_overtime_hours": 15.5,
          "ot_compensatory_hours": 15.5
        },
        {
          "id": 2,
          "department": "Operation",
          "project": "S-CORE",
          "project_type": "Fixed Price",
          "employee_id": "HauHT",
          "full_name": "Hoàng Thị Hậu",
          "weekday_overtime_hours": 10.00,
          "weekday_night_overtime_hours": 3.00,
          "sunday_night_overtime_hours": 5.00,
          "holiday_overtime_hours": 0.00,
          "holiday_overtime_overtime_hours": 0.00,
          "total_overtime_hours": 31.00,
          "sheet_name": "HauHT",
          "hyperlink": "Link",
          "paid_overtime_hours": 15.5,
          "ot_compensatory_hours": 15.5
        },
        {
          "id": 2,
          "department": "Operation",
          "project": "S-CORE",
          "project_type": "Fixed Price",
          "employee_id": "HauHT",
          "full_name": "Hoàng Thị Hậu",
          "weekday_overtime_hours": 10.00,
          "weekday_night_overtime_hours": 3.00,
          "sunday_night_overtime_hours": 5.00,
          "holiday_overtime_hours": 0.00,
          "holiday_overtime_overtime_hours": 0.00,
          "total_overtime_hours": 31.00,
          "sheet_name": "HauHT",
          "hyperlink": "Link",
          "paid_overtime_hours": 15.5,
          "ot_compensatory_hours": 15.5
        },
        {
          "id": 2,
          "department": "Operation",
          "project": "S-CORE",
          "project_type": "Fixed Price",
          "employee_id": "HauHT",
          "full_name": "Hoàng Thị Hậu",
          "weekday_overtime_hours": 10.00,
          "weekday_night_overtime_hours": 3.00,
          "sunday_night_overtime_hours": 5.00,
          "holiday_overtime_hours": 0.00,
          "holiday_overtime_overtime_hours": 0.00,
          "total_overtime_hours": 31.00,
          "sheet_name": "HauHT",
          "hyperlink": "Link",
          "paid_overtime_hours": 15.5,
          "ot_compensatory_hours": 15.5
        },
        {
          "id": 2,
          "department": "Operation",
          "project": "S-CORE",
          "project_type": "Fixed Price",
          "employee_id": "HauHT",
          "full_name": "Hoàng Thị Hậu",
          "weekday_overtime_hours": 10.00,
          "weekday_night_overtime_hours": 3.00,
          "sunday_night_overtime_hours": 5.00,
          "holiday_overtime_hours": 0.00,
          "holiday_overtime_overtime_hours": 0.00,
          "total_overtime_hours": 31.00,
          "sheet_name": "HauHT",
          "hyperlink": "Link",
          "paid_overtime_hours": 15.5,
          "ot_compensatory_hours": 15.5
        }

      ]

      try {
        data.forEach((item, index) => {
          const rowIndex = index + 8;
          worksheet.getCell(`A${rowIndex}`).value = item.id;
          worksheet.getCell(`B${rowIndex}`).value = item.department;
          worksheet.getCell(`C${rowIndex}`).value = item.project;
          worksheet.getCell(`D${rowIndex}`).value = item.project_type;
          worksheet.getCell(`E${rowIndex}`).value = item.employee_id;
          worksheet.getCell(`F${rowIndex}`).value = item.full_name;
          worksheet.getCell(`G${rowIndex}`).value = item.weekday_overtime_hours;
          worksheet.getCell(`H${rowIndex}`).value = item.weekday_night_overtime_hours;
          worksheet.getCell(`I${rowIndex}`).value = item.holiday_overtime_hours;
          worksheet.getCell(`J${rowIndex}`).value = item.holiday_overtime_overtime_hours;
          worksheet.getCell(`K${rowIndex}`).value = item.sunday_night_overtime_hours;
          worksheet.getCell(`L${rowIndex}`).value = item.holiday_overtime_hours;
          worksheet.getCell(`M${rowIndex}`).value = item.total_overtime_hours; worksheet.getCell(`N${rowIndex}`).value = item.sheet_name;
          worksheet.getCell(`O${rowIndex}`).value = item.hyperlink;
          worksheet.getCell(`P${rowIndex}`).value = item.paid_overtime_hours;
          worksheet.getCell(`Q${rowIndex}`).value = item.ot_compensatory_hours;
        });

        const buffer = await workbook.xlsx.writeBuffer();

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=OT_Records.xlsx');
        res.end(buffer);
        return {} as any;
      } catch (error) {
        console.error('Error writing Excel data:', error);
        throw new InternalServerErrorException('Error writing Excel data: ' + error.message);
      }
    } catch (error) {
      console.error('Error exporting Excel:', error.message);
      throw new InternalServerErrorException('Failed to export Excel: ' + error.message);
    }
  }
}