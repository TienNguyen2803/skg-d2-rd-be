/// <reference types="multer" />
import { ConfigService } from '@nestjs/config';
import { FileEntity } from './entities/file.entity';
import { Repository } from 'typeorm';
import { AllConfigType } from 'src/config/config.type';
export declare class FilesService {
    private readonly configService;
    private readonly fileRepository;
    constructor(configService: ConfigService<AllConfigType>, fileRepository: Repository<FileEntity>);
    uploadFile(file: Express.Multer.File | Express.MulterS3.File): Promise<FileEntity>;
}
