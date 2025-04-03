import { ClsService } from 'nestjs-cls';
import { DataSource, EntitySubscriberInterface, InsertEvent, UpdateEvent } from 'typeorm';
import { EntityHelper } from '../entity-helper';
export declare class EntityHelperSubscriber implements EntitySubscriberInterface<EntityHelper> {
    private readonly cls;
    constructor(dataSource: DataSource, cls: ClsService);
    listenTo(): typeof EntityHelper;
    beforeInsert(event: InsertEvent<EntityHelper>): void;
    beforeUpdate(event: UpdateEvent<EntityHelper>): void;
}
