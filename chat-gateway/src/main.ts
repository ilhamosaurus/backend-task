import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = 3013 || process.env.PORT;
  Logger.log(`Server start at ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
