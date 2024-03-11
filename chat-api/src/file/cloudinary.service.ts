import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
import { Injectable } from '@nestjs/common';

@Injectable()
export class CloudinaryService {
  async upload(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { folder: 'chat-api' },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          if (result) {
            resolve(result);
          } else {
            reject(new Error('Upload result is undefined'));
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }

  async destroy(publicId: string): Promise<void> {
    await v2.uploader.destroy(publicId);
  }
}
