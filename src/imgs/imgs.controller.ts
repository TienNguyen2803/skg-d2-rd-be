
import { Controller, Post, UseInterceptors, UploadedFile, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { extname } from 'path';

@ApiTags('Images')
@Controller({
  path: 'imgs',
  version: '1',
})
export class ImgsController {
  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Upload image' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname);
          callback(null, `${randomStringGenerator()}${fileExtName}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      path: file.path.replace('uploads/', '/'),
    };
  }
}
