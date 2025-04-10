
import { ApiProperty } from '@nestjs/swagger';

export class ExportTimesheetDto {
  @ApiProperty({ type: 'array', description: 'Array of timesheet data' })
  data: Array<{
    STT: number;
    Phòng: string;
    'Dự án': string;
    'Loại dự án': string;
    'Mã nhân viên': string;
    'Họ và tên': string;
    'Số giờ làm thêm từ T2-T7': number;
    'Số giờ làm thêm đêm từ T2-T7 (Sau 22h00)': number;
    'Số giờ làm thêm đêm CN (Sau 22h00)': number;
    'Số giờ làm thêm ngày lễ (Sau 22h00)': number;
    'Tổng số giờ làm thêm': number;
    'Sheet name': string;
    'Hyperlink': string;
    'Số giờ lương OT': number;
    'Số giờ nghỉ bù OT': number;
  }>;
}
