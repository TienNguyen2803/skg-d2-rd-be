import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  HttpCode,
  Param,
  ParseIntPipe,
  HttpStatus,
  Patch,
  Res,
  Header,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { ExportTimesheetDto } from './dto/export-timesheet.dto';
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
    console.log('user', user)
    return this.timesheetService.create(createTimesheetDto, user.id);
  }

  @Get()
  findAll(@CurrentUser() user) {
    return this.timesheetService.findAll(user.id);
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
        // Get the number of records
        const recordCount = data.length;
        const startRow = 8;  // Starting row for data
        const templateRow = worksheet.getRow(8);

        // Save sum row data and styles
        const sumRow = worksheet.getRow(9);
        const sumRowStyle = {};
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'].forEach(col => {
          sumRowStyle[col] = sumRow.getCell(col).style;
        });

        // Remove sum row temporarily
        worksheet.spliceRows(9, 1);

        // Duplicate template row for each record
        for (let i = 0; i < recordCount - 1; i++) {
          const targetRow = startRow + i + 1;
          worksheet.duplicateRow(startRow, targetRow, true);
        }

        // Add sum row at the bottom
        const newSumRowNumber = startRow + recordCount;
        worksheet.addRow({}, newSumRowNumber);
        const newSumRow = worksheet.getRow(newSumRowNumber);

        // Apply saved sum row styles
        Object.entries(sumRowStyle).forEach(([col, style]) => {
          newSumRow.getCell(col).style = style;
        });

        // Populate data into rows
        data.forEach((item, index) => {
          const rowIndex = startRow + index;
          const row = worksheet.getRow(rowIndex);

          row.values = {
            1: item.id,
            2: item.department,
            3: item.project,
            4: item.project_type,
            5: item.employee_id,
            6: item.full_name,
            7: item.weekday_overtime_hours,
            8: item.weekday_night_overtime_hours,
            9: item.holiday_overtime_hours,
            10: item.holiday_overtime_overtime_hours,
            11: item.sunday_night_overtime_hours,
            12: item.holiday_overtime_hours,
            13: item.total_overtime_hours,
            14: item.sheet_name,
            15: item.hyperlink,
            16: item.paid_overtime_hours,
            17: item.ot_compensatory_hours
          };

          // Apply number format for numeric cells
          ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'P', 'Q'].forEach(col => {
            row.getCell(col).numFmt = '0.00';
          });
        });

        // Add sum formulas
        const sumRowNumber = startRow + recordCount;
        worksheet.getCell(`F${sumRowNumber}`).value = 'Total';

        // Update formulas with correct ranges
        const formulaColumns = ['G', 'H', 'I', 'K', 'M', 'P', 'Q'];
        formulaColumns.forEach(col => {
          worksheet.getCell(`${col}${sumRowNumber}`).value = {
            formula: `SUM(${col}${startRow}:${col}${sumRowNumber-1})`
          };
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