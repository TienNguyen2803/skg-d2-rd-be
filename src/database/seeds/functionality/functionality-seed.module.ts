
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Functionality } from 'src/functionalities/entities/functionality.entity';
import { FunctionalitySeedService } from './functionality-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Functionality])],
  providers: [FunctionalitySeedService],
  exports: [FunctionalitySeedService],
})
export class FunctionalitySeedModule {}
