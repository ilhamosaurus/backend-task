import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtGuard } from 'src/auth/ws-jwt/jwt.guard';
import { Request } from 'express';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  async createMessage(@Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(dto);
  }

  @Get()
  async getMessages(@Req() req: Request) {
    const user = req.user as User;
    return this.messagesService.getAllMessages(user);
  }
}
