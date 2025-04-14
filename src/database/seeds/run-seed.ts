import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { RoleSeedService } from './role/role-seed.service';
import { StatusSeedService } from './status/status-seed.service';
import { UserSeedService } from './user/user-seed.service';
import { TimesheetStatusSeedService } from './timesheet-status/timesheet-status-seed.service';
import { ProjectTypeSeedService } from './project-type/project-type-seed.service';

const runSeed = async () => {
  const app = await NestFactory.create(SeedModule);

  // Get the seed services
  const roleSeedService = app.get(RoleSeedService);
  const statusSeedService = app.get(StatusSeedService);
  const userSeedService = app.get(UserSeedService);
  const timesheetStatusSeedService = app.get(TimesheetStatusSeedService);
  const projectTypeSeedService = app.get(ProjectTypeSeedService);

  // Run the seeds
  await roleSeedService.run();
  await statusSeedService.run();
  await userSeedService.run();
  await timesheetStatusSeedService.run();
  await projectTypeSeedService.run();

  await app.close();
};

void runSeed();