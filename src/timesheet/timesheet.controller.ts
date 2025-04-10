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

  interface TotalRowContent {
    column: string;
    value: ExcelJS.CellValue;
    formula?: string;
    style: Partial<ExcelJS.Style>;
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
        // First, store the total row content
        const totalRowContent: TotalRowContent[] = [];
        const totalRowNumber = 12; // Current total row position
        const columns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q'];

        // Store total row values
        columns.forEach(col => {
          const cell = worksheet.getCell(`${col}${totalRowNumber}`);
          const content: TotalRowContent = {
            column: col,
            value: cell.value,
            style: cell.style
          };
          
          if (cell.formula) {
            content.formula = cell.formula;
          }
          
          totalRowContent.push(content);
        });

        // Clear the old total row
        columns.forEach(col => {
          worksheet.getCell(`${col}${totalRowNumber}`).value = null;
        });

        // Write data rows
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
          worksheet.getCell(`M${rowIndex}`).value = item.total_overtime_hours;
          worksheet.getCell(`N${rowIndex}`).value = item.sheet_name;
          worksheet.getCell(`O${rowIndex}`).value = item.hyperlink;
          worksheet.getCell(`P${rowIndex}`).value = item.paid_overtime_hours;
          worksheet.getCell(`Q${rowIndex}`).value = item.ot_compensatory_hours;
        });

        // Calculate new total row position (after last data row)
        const newTotalRowPosition = data.length + 8;

        // Write the total row in new position
        totalRowContent.forEach(cell => {
          const newCell = worksheet.getCell(`${cell.column}${newTotalRowPosition}`);
          if (cell.formula) {
            // Update formula to reference new row range
            const updatedFormula = cell.formula.replace(/8:12/g, `8:${newTotalRowPosition-1}`);
            newCell.formula = updatedFormula;
          } else {
            newCell.value = cell.value;
          }
          // Copy styling
          Object.assign(newCell.style, cell.style);
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