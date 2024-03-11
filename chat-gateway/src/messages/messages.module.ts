import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { ChatModule } from 'src/chat/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
