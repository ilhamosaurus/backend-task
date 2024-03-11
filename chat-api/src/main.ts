import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodFilter } from './zod/zod.error';
import { Logger } from '@nestjs/common';
import { v2 } from 'cloudinary';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ZodFilter());

  Logger.log('Starting server...');
  await app.listen(3000);
}
bootstrap();
