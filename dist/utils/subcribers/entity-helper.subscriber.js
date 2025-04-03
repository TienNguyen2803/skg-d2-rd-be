"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityHelperSubscriber = void 0;
const nestjs_cls_1 = require("nestjs-cls");
const typeorm_1 = require("typeorm");
const entity_helper_1 = require("../entity-helper");
let EntityHelperSubscriber = exports.EntityHelperSubscriber = class EntityHelperSubscriber {
    constructor(dataSource, cls) {
        this.cls = cls;
        dataSource.subscribers.push(this);
    }
    listenTo() {
        return entity_helper_1.EntityHelper;
    }
    beforeInsert(event) {
        event.entity.created_by = this.cls.get('user_id');
        event.entity.updated_by = this.cls.get('user_id');
    }
    beforeUpdate(event) {
        if (event.entity) {
            event.entity.updated_by = this.cls.get('user_id');
        }
    }
};
exports.EntityHelperSubscriber = EntityHelperSubscriber = __decorate([
    (0, typeorm_1.EventSubscriber)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        nestjs_cls_1.ClsService])
], EntityHelperSubscriber);
//# sourceMappingURL=entity-helper.subscriber.js.map