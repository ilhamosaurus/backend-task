import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorator';
import { User } from '@prisma/client';

@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @UseGuards(JwtGuard)
  async getUser(@GetUser() user: User) {
    return this.userService.getUserbyUsername(user.username);
  }
}
