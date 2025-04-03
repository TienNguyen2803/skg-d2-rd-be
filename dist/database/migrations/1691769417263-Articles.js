"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Articles1691769417263 = void 0;
class Articles1691769417263 {
    constructor() {
        this.name = 'Articles1691769417263';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "article" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "published" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "editedAt" TIMESTAMP NOT NULL DEFAULT now(), "content" text NOT NULL, "authorId" integer, CONSTRAINT "PK_40808690eb7b915046558c0f81b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "article" ADD CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "article" DROP CONSTRAINT "FK_a9c5f4ec6cceb1604b4a3c84c87"`);
        await queryRunner.query(`DROP TABLE "article"`);
    }
}
exports.Articles1691769417263 = Articles1691769417263;
//# sourceMappingURL=1691769417263-Articles.js.map