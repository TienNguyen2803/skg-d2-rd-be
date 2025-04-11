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
        // Get the number of records and calculate rows
        const recordCount = data.length;
        const startRow = 8;  // Starting row for data
        const sumRowTemplate = worksheet.getRow(9); // Store sum row template
        const sumFormulas = {
          G: sumRowTemplate.getCell('G').formula,
          H: sumRowTemplate.getCell('H').formula,
          I: sumRowTemplate.getCell('I').formula,
          K: sumRowTemplate.getCell('K').formula,
          M: sumRowTemplate.getCell('M').formula,
          P: sumRowTemplate.getCell('P').formula,
          Q: sumRowTemplate.getCell('Q').formula
        };
        
        // Remove the sum row temporarily
        worksheet.spliceRows(9, 1);
        
        // Get template row for data
        const templateRow = worksheet.getRow(8);
        
        // Insert new rows for the data
        for (let i = 0; i < recordCount; i++) {
          const newRow = worksheet.insertRow(startRow + i, {}, 'i');
          // Copy template row styles
          newRow.height = templateRow.height;
          // Copy styles from each cell A through Q
          ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q'].forEach(col => {
            newRow.getCell(col).style = templateRow.getCell(col).style;
          });
        }

        let totalWeekdayOT = 0;
        let totalWeekdayNightOT = 0;
        let totalSundayNightOT = 0;
        let totalHolidayOT = 0;
        let totalOTHours = 0;
        let totalPaidOT = 0;
        let totalCompensatoryOT = 0;

        // Now populate the data into the newly inserted rows
        data.forEach((item, index) => {
          const rowIndex = startRow + index;

          // Get the template row style 
          const templateRow = worksheet.getRow(startRow - 1);
          const currentRow = worksheet.getRow(rowIndex);

          // Copy template row styles
          currentRow.height = templateRow.height;
          currentRow.getCell('A').style = templateRow.getCell('A').style;

          // Populate data
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
          worksheet.getCell(`M${rowIndex}`).value = item.total_overtime_hours;
          worksheet.getCell(`N${rowIndex}`).value = item.sheet_name;
          worksheet.getCell(`O${rowIndex}`).value = item.hyperlink;
          worksheet.getCell(`P${rowIndex}`).value = item.paid_overtime_hours;
          worksheet.getCell(`Q${rowIndex}`).value = item.ot_compensatory_hours;

          // Update totals
          totalWeekdayOT += item.weekday_overtime_hours || 0;
          totalWeekdayNightOT += item.weekday_night_overtime_hours || 0;
          totalSundayNightOT += item.sunday_night_overtime_hours || 0;
          totalHolidayOT += item.holiday_overtime_hours || 0;
          totalOTHours += item.total_overtime_hours || 0;
          totalPaidOT += item.paid_overtime_hours || 0;
          totalCompensatoryOT += item.ot_compensatory_hours || 0;

          // Apply number format for numeric cells
          ['G', 'H', 'I', 'J', 'K', 'L', 'M', 'P', 'Q'].forEach(col => {
            worksheet.getCell(`${col}${rowIndex}`).numFmt = '0.00';
          });
        });

        // Add sum row at the bottom
        const sumRowNumber = startRow + recordCount;
        const newSumRow = worksheet.insertRow(sumRowNumber, undefined);
        
        // Copy styles from template
        newSumRow.height = sumRowTemplate.height;
        Object.keys(sumRowTemplate.cells).forEach(col => {
          newSumRow.getCell(col).style = sumRowTemplate.getCell(col).style;
        });

        // Set values and formulas
        worksheet.getCell(`F${sumRowNumber}`).value = 'Total';
        
        // Update formula ranges for the new row positions
        const firstDataRow = startRow;
        const lastDataRow = sumRowNumber - 1;
        
        worksheet.getCell(`G${sumRowNumber}`).formula = `SUM(G${firstDataRow}:G${lastDataRow})`;
        worksheet.getCell(`H${sumRowNumber}`).formula = `SUM(H${firstDataRow}:H${lastDataRow})`;
        worksheet.getCell(`I${sumRowNumber}`).formula = `SUM(I${firstDataRow}:I${lastDataRow})`;
        worksheet.getCell(`K${sumRowNumber}`).formula = `SUM(K${firstDataRow}:K${lastDataRow})`;
        worksheet.getCell(`M${sumRowNumber}`).formula = `SUM(M${firstDataRow}:M${lastDataRow})`;
        worksheet.getCell(`P${sumRowNumber}`).formula = `SUM(P${firstDataRow}:P${lastDataRow})`;
        worksheet.getCell(`Q${sumRowNumber}`).formula = `SUM(Q${firstDataRow}:Q${lastDataRow})`;

        // Apply formatting
        ['G', 'H', 'I', 'K', 'M', 'P', 'Q'].forEach(col => {
          const cell = worksheet.getCell(`${col}${sumRowNumber}`);
          cell.numFmt = '0.00';
          cell.font = { bold: true };
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