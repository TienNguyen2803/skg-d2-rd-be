
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleSeedService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
  ) { }

  async run() {
    // Kiểm tra role USER đã tồn tại chưa
    const existingUserRole = await this.repository.findOne({
      where: {
        code: 'USER',
      },
    });

    if (!existingUserRole) {
      await this.repository.save(
        this.repository.create({
          name: 'User',
          code: 'USER'
        }),
      );
    }

    // Kiểm tra role ADMIN đã tồn tại chưa
    const existingAdminRole = await this.repository.findOne({
      where: {
        code: 'ADMIN',
      },
    });

    if (!existingAdminRole) {
      await this.repository.save(
        this.repository.create({
          name: 'Admin',
          code: 'ADMIN'
        }),
      );
    }
  }
}
