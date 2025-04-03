import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import databaseConfig from './config/database.config';
import authConfig from './config/auth.config';
import appConfig from './config/app.config';
import mailConfig from './config/mail.config';
import fileConfig from './config/file.config';
import googleConfig from './config/google.config';
import path from 'path';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { I18nModule } from 'nestjs-i18n/dist/i18n.module';
import { HeaderResolver } from 'nestjs-i18n';
import { TypeOrmConfigService } from './database/typeorm-config.service';
import { ForgotModule } from './forgot/forgot.module';
import { MailModule } from './mail/mail.module';
import { HomeModule } from './home/home.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { AllConfigType } from './config/config.type';
import { SessionModule } from './session/session.module';
import { MailerModule } from './mailer/mailer.module';
import { SpaInfoModule } from './spa-info/spa-info.module';
import { ServiceCategoriesModule } from './service-categories/service-categories.module';
import { ServicesModule } from './services/services.module';
import { ClsModule } from 'nestjs-cls';
import { EntityHelperSubscriber } from './utils/subcribers/entity-helper.subscriber';
import { PortalsModule } from './portals/portals.module'; // Import the newly created module


@Module({
  imports: [
    PortalsModule, // Added PortalsModule to imports
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        databaseConfig,
        authConfig,
        appConfig,
        mailConfig,
        fileConfig,
        googleConfig,
      ],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    I18nModule.forRootAsync({
      useFactory: (configService: ConfigService<AllConfigType>) => ({
        fallbackLanguage: configService.getOrThrow('app.fallbackLanguage', {
          infer: true,
        }),
        loaderOptions: { path: path.join(__dirname, '/i18n/'), watch: true },
      }),
      resolvers: [
        {
          use: HeaderResolver,
          useFactory: (configService: ConfigService<AllConfigType>) => {
            return [
              configService.get('app.headerLanguage', {
                infer: true,
              }),
            ];
          },
          inject: [ConfigService],
        },
      ],
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    ClsModule.forRoot({
      global: true,
      middleware: { mount: true },
    }),
    EntityHelperSubscriber,
    UsersModule,
    AuthModule,
    AuthGoogleModule,
    ForgotModule,
    SessionModule,
    MailModule,
    MailerModule,
    HomeModule,
    SpaInfoModule,
    ServiceCategoriesModule,
    ServicesModule,
  ],
})
export class AppModule { }

//Below are the files that need to be created to complete the request.  These are examples and may need adjustments based on your specific needs and the structure of spa-info

// src/portals/dto/create-portal.dto.ts
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreatePortalDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  // Add other fields as needed from spa-info
}

// src/portals/dto/update-portal.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreatePortalDto } from './create-portal.dto';

export class UpdatePortalDto extends PartialType(CreatePortalDto) {}

// src/portals/portals.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePortalDto } from './dto/create-portal.dto';
import { UpdatePortalDto } from './dto/update-portal.dto';
import { Portal } from './entities/portal.entity'; // You'll need to create this entity

@Injectable()
export class PortalsService {
  constructor(
    @InjectRepository(Portal)
    private portalsRepository: Repository<Portal>,
  ) {}

  findAll(): Promise<Portal[]> {
    return this.portalsRepository.find();
  }

  findOne(id: number): Promise<Portal> {
    return this.portalsRepository.findOneBy({ id });
  }

  create(createPortalDto: CreatePortalDto): Promise<Portal> {
    const portal = this.portalsRepository.create(createPortalDto);
    return this.portalsRepository.save(portal);
  }

  update(id: number, updatePortalDto: UpdatePortalDto): Promise<Portal> {
    return this.portalsRepository.update(id, updatePortalDto).then(() => this.findOne(id));
  }

  remove(id: number): Promise<void> {
    return this.portalsRepository.delete(id).then(() => undefined);
  }
}


// src/portals/portals.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreatePortalDto } from './dto/create-portal.dto';
import { UpdatePortalDto } from './dto/update-portal.dto';
import { PortalsService } from './portals.service';

@Controller('portals')
export class PortalsController {
  constructor(private readonly portalsService: PortalsService) {}

  @Post()
  create(@Body() createPortalDto: CreatePortalDto) {
    return this.portalsService.create(createPortalDto);
  }

  @Get()
  findAll() {
    return this.portalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portalsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePortalDto: UpdatePortalDto) {
    return this.portalsService.update(+id, updatePortalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portalsService.remove(+id);
  }
}


// src/portals/entities/portal.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Portal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  // Add other fields as needed from spa-info
}

// src/portals/portals.module.ts
import { Module } from '@nestjs/common';
import { PortalsService } from './portals.service';
import { PortalsController } from './portals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portal } from './entities/portal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Portal])],
  controllers: [PortalsController],
  providers: [PortalsService],
  exports: [PortalsService] //Added to export the service if needed elsewhere
})
export class PortalsModule {}