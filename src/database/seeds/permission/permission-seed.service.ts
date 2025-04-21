
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/permissions/entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionSeedService {
  constructor(
    @InjectRepository(Permission)
    private repository: Repository<Permission>,
  ) {}

  async run() {
    const permissions = [
      { id: 1, functionality_id: 1, action_id: 1, name: 'timesheet.view' },
      { id: 2, functionality_id: 1, action_id: 2, name: 'timesheet.edit' },
      { id: 3, functionality_id: 1, action_id: 3, name: 'timesheet.delete' },
      { id: 4, functionality_id: 1, action_id: 4, name: 'timesheet.create' },
      { id: 5, functionality_id: 1, action_id: 5, name: 'timesheet.approve' },
      { id: 6, functionality_id: 1, action_id: 6, name: 'timesheet.reject' },
    ];

    for (const permission of permissions) {
      const exists = await this.repository.findOne({ where: { id: permission.id } });
      if (exists) {
        await this.repository.update(permission.id, permission);
      } else {
        await this.repository.save(this.repository.create(permission));
      }
    }
  }
}
