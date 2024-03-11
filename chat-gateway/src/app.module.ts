import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MessagesModule } from './messages/messages.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ChatModule,
    MessagesModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
