import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/decorator';
import { User } from '@prisma/client';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('/')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'User found',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async getUser(@GetUser() user: User) {
    return this.userService.getUserbyUsername(user.username);
  }
}
