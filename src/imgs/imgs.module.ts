
import { Module } from '@nestjs/common';
import { ImgsController } from './imgs.controller';

@Module({
  controllers: [ImgsController],
})
export class ImgsModule {}
