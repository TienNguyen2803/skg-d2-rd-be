
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Functionality } from './entities/functionality.entity';
import { FunctionalitiesController } from './functionalities.controller';
import { FunctionalitiesService } from './functionalities.service';

@Module({
  imports: [TypeOrmModule.forFeature([Functionality])],
  controllers: [FunctionalitiesController],
  providers: [FunctionalitiesService],
  exports: [FunctionalitiesService],
})
export class FunctionalitiesModule {}
