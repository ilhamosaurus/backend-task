import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Chat-gateway')
    .setDescription('Backend task gateway for chat-api')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/doc', app, document);

  const PORT = process.env.PORT || 3013;
  await app.listen(PORT, () => {
    Logger.log(
      `Running chat-gateway on PORT: ${process.env.PORT} in MODE: ${process.env.NODE_ENV}`,
    );
  });
}
bootstrap();
