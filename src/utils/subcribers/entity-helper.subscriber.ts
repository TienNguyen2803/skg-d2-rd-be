import { ClsService } from 'nestjs-cls';
import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent,
} from 'typeorm';
import { EntityHelper } from '../entity-helper';

@EventSubscriber()
export class EntityHelperSubscriber
  implements EntitySubscriberInterface<EntityHelper>
{
  constructor(
    dataSource: DataSource,
    private readonly cls: ClsService,
  ) {
    dataSource.subscribers.push(this);
  }
  listenTo() {
    return EntityHelper;
  }
  beforeInsert(event: InsertEvent<EntityHelper>) {
    event.entity.created_by = this.cls.get('user_id');
    event.entity.updated_by = this.cls.get('user_id');
  }

  beforeUpdate(event: UpdateEvent<EntityHelper>) {
    if (event.entity) {
      event.entity!.updated_by = this.cls.get('user_id');
    }
  }
}
