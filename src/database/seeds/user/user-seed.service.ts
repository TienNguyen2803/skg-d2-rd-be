
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { RoleEnum } from 'src/roles/roles.enum';
import { Status } from 'src/statuses/entities/status.entity';
import { StatusEnum } from 'src/statuses/statuses.enum';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async run() {
    // Kiểm tra số lượng người dùng hiện có trong hệ thống
    const userCount = await this.repository.count();

    // Nếu chưa có người dùng nào, tạo tài khoản Admin
    if (userCount === 0) {
      // Tìm role ADMIN trong cơ sở dữ liệu
      const adminRole = await this.roleRepository.findOne({
        where: {
          code: 'ADMIN',
        },
      });

      // Tìm status ACTIVE trong cơ sở dữ liệu
      const activeStatus = await this.statusRepository.findOne({
        where: {
          id: StatusEnum.active,
        },
      });

      await this.repository.save(
        this.repository.create({
          firstName: 'Super',
          lastName: 'Admin',
          email: 'admin@example.com',
          password: 'secret',
          role: adminRole || null,
          status: activeStatus || null,
        }),
      );

      console.log('User Admin đã được tạo thành công.');
    } else {
      console.log('Đã có người dùng trong hệ thống, không cần tạo thêm.');
    }
  }
}
