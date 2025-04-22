
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Functionality } from './entities/functionality.entity';

@Injectable()
export class FunctionalitiesService {
  constructor(
    @InjectRepository(Functionality)
    private functionalityRepository: Repository<Functionality>,
  ) { }

  async findAll(): Promise<Functionality[]> {
    const list = await this.functionalityRepository.find({
      relations: ['permissions', 'permissions.action'],
      order: {
        id: 'ASC',
      },
    });

    return this.convertToPermissionDto(list);
  }

  convertToPermissionDto = (data) => {
    // Sử dụng map để duyệt qua từng phần tử gốc
    return data.map(item => {
      // Bên trong mỗi item, lại dùng map để duyệt qua mảng permissions
      const actions = item.permissions
        .map(permission => {
          // Kiểm tra xem permission.action có tồn tại không (để tránh lỗi)
          if (permission.action) {
            // Tạo object action mới theo định dạng mong muốn
            return {
              // Lưu ý: Dựa theo ví dụ mong muốn của bạn,
              // chúng ta lấy `action.name` làm `id` và `action.description` làm `name`
              id: permission.action.name,
              name: permission.action.description,
              selected: false, // Mặc định selected là false
            };
          }
          // Trường hợp không có action (dữ liệu không nhất quán), trả về null hoặc bỏ qua
          return null;
        })
        .filter(action => action !== null); // Lọc bỏ các giá trị null nếu có

      // Trả về object mới cho item gốc, bao gồm cả mảng actions đã được tạo
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        actions: actions, // Thêm mảng actions vào object
      };
    });
  }
}
