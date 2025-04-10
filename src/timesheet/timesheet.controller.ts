
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
  async exportExcel(@Res() res: Response): Promise<void> {
    try {
      // Đường dẫn tới file template
      const templatePath = path.join(
        process.cwd(),
        'src',
        'template',
        'ot_template.xlsx',
      );

      // Kiểm tra template có tồn tại không
      if (!fs.existsSync(templatePath)) {
        throw new NotFoundException('Template file not found');
      }

      // Đọc file Excel template
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.readFile(templatePath);

      // Dữ liệu mẫu
      const data = [
        {
          stt: 1,
          department: 'Operation',
          project: 'S-CORE',
          type: 'Fixed Price',
          code: 'HauHT',
          name: 'Hoàng Thị Hậu',
          hour1: 10.0,
          hour2: 3.0,
          hour3: 5.0,
          hour4: 0.0,
          total: 31.0,
          Sheetname: 'HauHT',
          Hyperlink: 'Link',
          totalOT: 15.5,
          totalOT1: 15.5,
        },
      ];

      // Lấy worksheet đầu tiên
      const worksheet = workbook.getWorksheet(1);
      if (!worksheet) {
        throw new NotFoundException('Worksheet not found');
      }

      // Điền dữ liệu vào file Excel
      data.forEach((item, index) => {
        const rowIndex = index + 2; // Bắt đầu từ hàng thứ 2
        worksheet.getCell(`A${rowIndex}`).value = item.stt;
        worksheet.getCell(`B${rowIndex}`).value = item.department;
        worksheet.getCell(`C${rowIndex}`).value = item.project;
        worksheet.getCell(`D${rowIndex}`).value = item.type;
        worksheet.getCell(`E${rowIndex}`).value = item.code;
        worksheet.getCell(`F${rowIndex}`).value = item.name;
        worksheet.getCell(`G${rowIndex}`).value = item.hour1;
        worksheet.getCell(`H${rowIndex}`).value = item.hour2;
        worksheet.getCell(`I${rowIndex}`).value = item.hour3;
        worksheet.getCell(`J${rowIndex}`).value = item.hour4;
        worksheet.getCell(`K${rowIndex}`).value = item.total;
        worksheet.getCell(`M${rowIndex}`).value = item.totalOT;
        worksheet.getCell(`N${rowIndex}`).value = item.totalOT1;
      });

      // Ghi file Excel vào buffer
      const buffer = await workbook.xlsx.writeBuffer();

      // Thiết lập header và gửi file về client
      res.setHeader('Content-Disposition', 'attachment; filename=OT_Records.xlsx');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.end(buffer); // Sử dụng res.end thay vì res.send
    } catch (error) {
      console.error('Error exporting Excel:', error.message);
      throw new InternalServerErrorException('Failed to export Excel: ' + error.message);
    }
  }
}
