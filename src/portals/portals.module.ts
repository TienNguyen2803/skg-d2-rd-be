
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portal } from './entities/portal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portal])],
})
export class PortalsModule {}
