import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUserbyEmail(email: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return user;
    } catch (error) {
      Logger.error(error);
      return null;
    }
  }

  async getUserbyUsername(username: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          username: username,
        },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return result;
    } catch (error) {
      Logger.error(error);
      return null;
    }
  }
}
