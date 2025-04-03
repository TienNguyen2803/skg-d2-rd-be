
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portal } from './entities/portal.entity';
import { PortalsService } from './portals.service';
import { PortalsController } from './portals.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Portal])],
  controllers: [PortalsController],
  providers: [PortalsService],
})
export class PortalsModule {}
