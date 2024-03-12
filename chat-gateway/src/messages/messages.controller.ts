import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, ResponseDto } from './dto/create-message.dto';
import { JwtGuard } from 'src/auth/ws-jwt/jwt.guard';
import { Request } from 'express';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Messages')
@UseGuards(JwtGuard)
@Controller('/')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post('sendMessages')
  @ApiBearerAuth()
  @ApiBody({
    type: CreateMessageDto,
    description: 'API to send a message',
  })
  @ApiResponse({
    type: ResponseDto,
    status: 201,
    description: 'Message created and sent to gateway',
  })
  @ApiResponse({
    description: 'Unauthorized action',
    status: 401,
  })
  @ApiResponse({
    description: 'Recepient not found',
    status: 404,
  })
  @ApiResponse({
    description: 'Something went wrong',
    status: 500,
  })
  async createMessage(@Body() dto: CreateMessageDto) {
    return this.messagesService.createMessage(dto);
  }

  @Get('viewMessages')
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Messages found and sent to gateway',
  })
  @ApiResponse({
    status: 404,
    description: 'No messages available yet',
  })
  async getMessages(@Req() req: Request) {
    const user = req.user as User;
    return this.messagesService.getAllMessages(user);
  }
}
