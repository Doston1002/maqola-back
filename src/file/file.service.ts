import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import * as pathModule from 'path'; // ✅ SECURITY FIX: path module qo'shildi
import { FileResponse } from './file.interface';

@Injectable()
export class FileService {
  private getUploadRoot(): string {
    // Serverda yozish huquqi bor papkani belgilash uchun (masalan: /var/www/app/uploads)
    const envDir = process.env.UPLOAD_DIR?.trim();
    if (envDir) return pathModule.resolve(envDir);
    return pathModule.join(path, 'uploads');
  }

  async saveFile(file: Express.Multer.File, folder: string = 'default'): Promise<FileResponse> {
    const uploadRoot = this.getUploadRoot();
    const sanitizedFolder = pathModule.basename(folder);
    const uploadFolder = pathModule.join(uploadRoot, sanitizedFolder);
    const uniqueId = Math.floor(Math.random() * 9999);
    const safeFilename = pathModule.basename(file.originalname);
    const filePath = pathModule.join(uploadFolder, `${uniqueId}-${safeFilename}`);

    try {
      await ensureDir(uploadFolder);
      await writeFile(filePath, file.buffer);
    } catch (err: any) {
      const message = err?.message || String(err);
      console.error('[FileService] PDF/fayl saqlash xatolik:', message);
      console.error('[FileService] uploadFolder:', uploadFolder);
      throw new HttpException(
        process.env.NODE_ENV === 'production'
          ? 'Fayl saqlashda xatolik. Server loglarini tekshiring.'
          : `Fayl saqlash xatolik: ${message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const response: FileResponse = {
      url: `/uploads/${sanitizedFolder}/${uniqueId}-${safeFilename}`,
      name: safeFilename,
    };

    return response;
  }
}