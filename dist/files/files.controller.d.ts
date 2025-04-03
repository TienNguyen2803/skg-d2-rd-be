/// <reference types="multer" />
import { FilesService } from './files.service';
export declare class FilesController {
    private readonly filesService;
    constructor(filesService: FilesService);
    uploadFile(file: Express.Multer.File | Express.MulterS3.File): Promise<import("./entities/file.entity").FileEntity>;
    download(path: any, response: any): any;
}
