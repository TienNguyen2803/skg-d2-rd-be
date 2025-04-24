
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './entities/user-role.entity';
import { UserRolesService } from './user-roles.service';
import { UserRolesController } from './user-roles.controller';
import { UserRolesApiController } from './user-roles-api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  controllers: [UserRolesController, UserRolesApiController],
  providers: [UserRolesService],
  exports: [UserRolesService],
})
export class UserRolesModule {}
