import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(
    private readonly cls: ClsService,
    private prisma: PrismaService,
    private userService: UserService,
  ) {}

  async createMessage(dto: CreateMessageDto) {
    const user: User = this.cls.get('user');

    const recipient = await this.userService.getUserbyUsername(dto.to);

    if (!recipient) {
      throw new NotFoundException('The Recipient you ask for does not exist');
    }

    try {
      const message = await this.prisma.message.create({
        data: {
          message: dto.message,
          receiver: dto.to,
          sender: user.username,
        },
      });

      return message;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }

  async getAllMessage() {
    const user: User = this.cls.get('user');

    try {
      const messages = await this.prisma.message.findMany({
        where: {
          sender: user.username,
          receiver: user.username,
        },
      });

      if (!messages) {
        throw new NotFoundException('You have no message available');
      }

      return messages;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong!');
    }
  }
}
