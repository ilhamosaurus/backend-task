import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ZodFilter } from './zod/zod.error';
import { Logger } from '@nestjs/common';
import { v2 } from 'cloudinary';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new ZodFilter());

  const config = new DocumentBuilder()
    .setTitle('Backend Task for Chat-api')
    .setDescription('Chat API')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    Logger.log(
      `Running chat-api on PORT: ${process.env.PORT} in MODE: ${process.env.NODE_ENV}`,
    );
  });
}
bootstrap();
