import { Injectable, BadRequestException } from '@nestjs/common';
import { supabase } from '../common/supabase.client';
import { v4 as uuid } from 'uuid';
import { Express } from 'express';

@Injectable()
export class UploadService {
  async uploadAndGetUrls(files: Express.Multer.File[]): Promise<string[]> {
    if (files.length > 5) {
      throw new BadRequestException('5 tadan ortiq rasm yuklanmaydi');
    }

    const urls: string[] = [];

    const bucket = process.env.SUPABASE_BUCKET;
    if (!bucket) {
      throw new Error('SUPABASE_BUCKET environment variable is not set');
    }

    for (const file of files) {
      const ext = file.originalname.split('.').pop();
      const fileName = `${uuid()}.${ext}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file.buffer, {
          contentType: file.mimetype,
        });

      if (error) throw new BadRequestException(error.message);

      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName);

      urls.push(data.publicUrl);
    }

    return urls;
  }
}
