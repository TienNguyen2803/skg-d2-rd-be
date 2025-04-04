/// <reference types="multer" />
import { Response } from 'express';
export declare class ImgsController {
    uploadImage(file: Express.Multer.File): {
        path: string;
    };
    getImage(filename: string, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
