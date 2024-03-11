import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '@prisma/client';
import { ChatGateway } from 'src/chat/chat.gateway';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private chatGateway: ChatGateway,
  ) {}

  async createMessage(dto: CreateMessageDto) {
    const sender = await this.prisma.user.findUnique({
      where: {
        username: dto.from,
      },
    });

    if (!sender) {
      throw new UnauthorizedException('Unauthorized action');
    }

    const recipient = await this.prisma.user.findUnique({
      where: {
        username: dto.to,
      },
    });

    if (!recipient) {
      throw new NotFoundException('The Recipient you ask for does not exist');
    }

    try {
      const message = await this.prisma.message.create({
        data: {
          message: dto.message,
          receiver: dto.to,
          sender: dto.from,
        },
      });

      this.chatGateway.sendMessage(message);
      return message;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getAllMessages(user: User) {
    try {
      const exsistingUser = await this.prisma.user.findUnique({
        where: {
          username: user.username,
        },
        include: {
          MessagesSent: true,
          MessagesReceived: true,
        },
      });

      const sentMessages = exsistingUser.MessagesSent;
      const receivedMessages = exsistingUser.MessagesReceived;

      const messages = [...sentMessages, ...receivedMessages];

      if (!messages) {
        throw new NotFoundException('You have no messages available');
      }

      this.chatGateway.allMessages(messages);
      return messages;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
