import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtGuard } from 'src/auth/guard';
import { UserInterceptor } from 'src/auth/interceptor/user.interceptor';
import { ZodPipe } from 'src/zod/zod.pipe';
import {
  CreateMessageDto,
  CreateMessageSchema,
} from './dto/create-message.dto';

@UseGuards(JwtGuard)
@UseInterceptors(UserInterceptor)
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @UsePipes(new ZodPipe(CreateMessageSchema))
  async createMessage(@Body() dto: CreateMessageDto) {
    return this.messageService.createMessage(dto);
  }

  @Get()
  async getAllMessages() {
    return this.messageService.getAllMessage();
  }
}
