
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Action } from 'src/actions/entities/action.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActionSeedService {
  constructor(
    @InjectRepository(Action)
    private repository: Repository<Action>,
  ) {}

  async run() {
    const actions = [
      { id: 1, name: 'view' },
      { id: 2, name: 'edit' },
      { id: 3, name: 'delete' },
      { id: 4, name: 'create' },
      { id: 5, name: 'approve' },
      { id: 6, name: 'reject' },
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
