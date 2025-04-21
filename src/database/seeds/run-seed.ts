import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { RoleSeedService } from './role/role-seed.service';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { TimesheetStatusSeedService } from './timesheet-status/timesheet-status-seed.service';
import { ProjectTypeSeedService } from './project-type/project-type-seed.service';
import { FunctionalitySeedService } from './functionality/functionality-seed.service';
import { ActionSeedService } from './action/action-seed.service';
import { PermissionSeedService } from './permission/permission-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // Get the seed services
  const roleSeedService = app.get(RoleSeedService);
  const statusSeedService = app.get(StatusSeedService);
  const userSeedService = app.get(UserSeedService);
  const timesheetStatusSeedService = app.get(TimesheetStatusSeedService);
  const projectTypeSeedService = app.get(ProjectTypeSeedService);
  const functionalitySeedService = app.get(FunctionalitySeedService);
  const actionSeedService = app.get(ActionSeedService);
  const permissionSeedService = app.get(PermissionSeedService);




  // Run the seeds
  await roleSeedService.run();
  await statusSeedService.run();
  await userSeedService.run();
  await timesheetStatusSeedService.run();
  await projectTypeSeedService.run();
  await functionalitySeedService.run();
  await actionSeedService.run();
  await permissionSeedService.run();


  await app.close();
};

void runSeed();