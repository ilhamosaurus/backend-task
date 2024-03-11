import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Patch,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtGuard } from 'src/auth/guard';
import { UserInterceptor } from 'src/auth/interceptor/user.interceptor';
import { ZodPipe } from 'src/zod/zod.pipe';
import { ProfileDto, ProfileSchema } from './dto/create-profile.dto';
import { GetUser } from 'src/decorator';
import { User } from '@prisma/client';
import {
  UpdateProfileSchema,
  updateProfileDto,
} from './dto/update-profile.dto';
import { Response } from 'express';

@UseGuards(JwtGuard)
@UseInterceptors(UserInterceptor)
@Controller('/')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createProfile')
  @UsePipes(new ZodPipe(ProfileSchema))
  async createProfile(@Body() dto: ProfileDto) {
    return this.profileService.createProfile(dto);
  }

  @Get('getProfile')
  async getProfile(@GetUser() user: User) {
    const profile = await this.profileService.getProfileByUserId(user.id);

    if (!profile) throw new NotFoundException('You have no profile yet');

    return profile;
  }

  @Patch('updateProfile')
  @UsePipes(new ZodPipe(UpdateProfileSchema))
  async updateProfile(@Body() dto: updateProfileDto) {
    return this.profileService.updateProfile(dto);
  }

  @Delete('deleteProfile')
  async deleteProfile(@Res() res: Response) {
    const data = await this.profileService.deleteProfile();

    return res.status(204).json(data);
  }
}
