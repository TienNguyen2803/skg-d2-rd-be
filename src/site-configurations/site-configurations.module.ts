
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SiteConfigurationsService } from './site-configurations.service';
import { SiteConfigurationsController } from './site-configurations.controller';
import { SiteConfiguration } from './entities/site-configuration.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SiteConfiguration])],
  controllers: [SiteConfigurationsController],
  providers: [SiteConfigurationsService],
})
export class SiteConfigurationsModule {}
