"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const seed_module_1 = require("./seed.module");
const role_seed_service_1 = require("./role/role-seed.service");
const status_seed_service_1 = require("./status/status-seed.service");
const user_seed_service_1 = require("./user/user-seed.service");
const timesheet_status_seed_service_1 = require("./timesheet-status/timesheet-status-seed.service");
const project_type_seed_service_1 = require("./project-type/project-type-seed.service");
const runSeed = async () => {
    const app = await core_1.NestFactory.create(seed_module_1.SeedModule);
    const roleSeedService = app.get(role_seed_service_1.RoleSeedService);
    const statusSeedService = app.get(status_seed_service_1.StatusSeedService);
    const userSeedService = app.get(user_seed_service_1.UserSeedService);
    const timesheetStatusSeedService = app.get(timesheet_status_seed_service_1.TimesheetStatusSeedService);
    const projectTypeSeedService = app.get(project_type_seed_service_1.ProjectTypeSeedService);
    await roleSeedService.run();
    await statusSeedService.run();
    await userSeedService.run();
    await timesheetStatusSeedService.run();
    await projectTypeSeedService.run();
    await app.close();
};
void runSeed();
//# sourceMappingURL=run-seed.js.map