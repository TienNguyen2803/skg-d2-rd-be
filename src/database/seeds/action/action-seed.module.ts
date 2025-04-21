
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Action } from 'src/actions/entities/action.entity';
import { ActionSeedService } from './action-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Action])],
  providers: [ActionSeedService],
  exports: [ActionSeedService],
})
export class ActionSeedModule {}
