import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEnum } from 'src/roles/roles.enum';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  async run() {
    // Kiểm tra số lượng người dùng hiện có trong hệ thống
    const userCount = await this.repository.count();

    // Nếu chưa có người dùng nào, tạo tài khoản Admin
    if (userCount === 0) {
      await this.repository.save(
        this.repository.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password: 'secret',
          role: {
            id: RoleEnum.admin,
            name: 'Admin',
            code: 'ADMIN',
          },
          status: {
            id: StatusEnum.active,
            name: 'Active',
          },
        }),
      );

      console.log('User Admin đã được tạo thành công.');
    } else {
      console.log('Đã có người dùng trong hệ thống, không cần tạo thêm.');
    }
  }
}