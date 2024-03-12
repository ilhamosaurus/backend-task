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
import {
  ProfileDto,
  ProfileSchema,
  ResponseCreate,
} from './dto/create-profile.dto';
import { GetUser } from 'src/decorator';
import { User } from '@prisma/client';
import {
  UpdateProfileSchema,
  updateProfileDto,
} from './dto/update-profile.dto';
import { Response } from 'express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Profile')
@UseGuards(JwtGuard)
@UseInterceptors(UserInterceptor)
@Controller('/')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post('createProfile')
  @ApiBearerAuth()
  @ApiBody({
    description: "API to create user's profile",
    type: ProfileDto,
  })
  @ApiCreatedResponse({
    type: ResponseCreate,
    description: 'Profile created',
    status: 201,
  })
  @ApiResponse({
    status: 400,
    description: 'Already have a profile or invalid input',
  })
  @ApiResponse({
    status: 500,
    description: 'server internal error',
  })
  @UsePipes(new ZodPipe(ProfileSchema))
  async createProfile(@Body() dto: ProfileDto) {
    return this.profileService.createProfile(dto);
  }

  @Get('getProfile')
  @ApiBearerAuth()
  @ApiResponse({
    type: ResponseCreate,
    status: 200,
    description: 'profile found',
  })
  @ApiResponse({
    status: 404,
    description: 'Profile not found',
  })
  async getProfile(@GetUser() user: User) {
    const profile = await this.profileService.getProfileByUserId(user.id);

    if (!profile) throw new NotFoundException('You have no profile yet');

    return profile;
  }

  @Patch('updateProfile')
  @ApiBearerAuth()
  @ApiBody({
    type: updateProfileDto,
    description: 'API for updating a profile',
  })
  @ApiResponse({
    type: ResponseCreate,
    status: 201,
    description: 'Profile updated',
  })
  @ApiResponse({
    status: 404,
    description: 'Profiles not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Input',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong',
  })
  @UsePipes(new ZodPipe(UpdateProfileSchema))
  async updateProfile(@Body() dto: updateProfileDto) {
    return this.profileService.updateProfile(dto);
  }

  @Delete('deleteProfile')
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'Profile deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Profiles not found',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong',
  })
  async deleteProfile(@Res() res: Response) {
    await this.profileService.deleteProfile();

    return res.status(204);
  }
}
