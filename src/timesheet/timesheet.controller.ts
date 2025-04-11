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
      ]

      try {
        console.log(`Total records: ${data.length}`);
        const startRow = 8;

        // First, duplicate the template row based on data length
        const templateRow = worksheet.getRow(startRow);
        for (let i = 1; i < data.length; i++) {
          const newRowNumber = startRow + i;
          const newRow = worksheet.getRow(newRowNumber);

          // Copy formatting and formulas from template row
          templateRow.eachCell((cell, colNumber) => {
            const newCell = newRow.getCell(colNumber);
            newCell.style = JSON.parse(JSON.stringify(cell.style)); // Deep copy style
            if (cell.formula) {
              newCell.formula = cell.formula;
            }
          });
        }

        // Fill data after duplicating rows
        data.forEach((item, index) => {
          const rowIndex = index + 8;
          const row = worksheet.getRow(rowIndex);

          // Fill data while preserving cell formatting
          const cellValues = {
            'A': item.id,
            'B': item.department,
            'C': item.project,
            'D': item.project_type,
            'E': item.employee_id,
            'F': item.full_name,
            'G': item.weekday_overtime_hours,
            'H': item.weekday_night_overtime_hours,
            'I': item.holiday_overtime_hours,
            'J': item.holiday_overtime_overtime_hours,
            'K': item.sunday_night_overtime_hours,
            'L': item.holiday_overtime_hours,
            'M': item.total_overtime_hours,
            'N': item.sheet_name,
            'O': item.hyperlink,
            'P': item.paid_overtime_hours,
            'Q': item.ot_compensatory_hours
          };

          Object.entries(cellValues).forEach(([col, value]) => {
            const cell = row.getCell(col);
            const existingStyle = cell.style;
            cell.value = value;
            cell.style = existingStyle; // Preserve formatting
          });
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