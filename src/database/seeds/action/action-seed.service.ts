
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from 'src/actions/entities/action.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActionSeedService {
  constructor(
    @InjectRepository(Action)
    private repository: Repository<Action>,
  ) { }

  async run() {
    const actions = [
      { id: 1, name: 'view', description: "Xem" },
      { id: 2, name: 'edit', description: "Sửa" },
      { id: 3, name: 'delete', description: "Xoá" },
      { id: 4, name: 'create', description: "Tạo" },
      { id: 5, name: 'approve', description: "Phê duyệt" },
      { id: 6, name: 'reject', description: "Từ chối" },
    ];

    for (const action of actions) {
      const exists = await this.repository.findOne({ where: { id: action.id } });
      if (exists) {
        await this.repository.update(action.id, action);
      } else {
        await this.repository.save(this.repository.create(action));
      }
    }
  }
}
