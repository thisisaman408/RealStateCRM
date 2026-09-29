import { Injectable, Logger } from '@nestjs/common';
import { uploadFileToBlob } from '@resyl/storage';

@Injectable()
export class StorageService {
  private readonly logger = new Logger(StorageService.name);

  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    mimeType: string,
  ): Promise<string> {
    this.logger.log(
      `Uploading ${fileName} to Vercel Blob via @resyl/storage`,
    );
    try {
      const url = await uploadFileToBlob(fileBuffer, fileName);
      return url;
    } catch (error) {
      this.logger.error('Vercel Blob upload failed', error);
      throw error;
    }
  }
}
