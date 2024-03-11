import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './dto/create-profile.dto';
import { User } from '@prisma/client';
import { horoscopeZodiac } from './utils/horoscope';
import { updateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly cls: ClsService,
    private prisma: PrismaService,
  ) {}

  async createProfile(dto: ProfileDto) {
    const user: User = this.cls.get('user'); //extract user from interceptors
    const existingProfile = await this.getProfileByUserId(user.id);

    if (existingProfile) {
      throw new BadRequestException('You alreade have a profile');
    }

    const { horoscope, zodiac, birthdate } = await horoscopeZodiac(
      dto.birthday,
    );

    if (!horoscope) throw new BadRequestException('Invalid birthday input!');

    if (!zodiac) {
      throw new BadRequestException(
        "We're sorry, your age does not fit our policy",
      ); // that get horoscope zodiac function also set this api age policy
    }

    if (!birthdate) {
      throw new BadRequestException('Invalid birthday input!');
    }

    try {
      const profile = await this.prisma.profile.create({
        data: {
          name: dto.name,
          gender: dto.gender,
          birthday: birthdate,
          horoscope: horoscope,
          zodiac: zodiac,
          height: dto.height,
          weight: dto.weight,
          userId: user.id,
          interest: dto.interest,
        },
      });

      return profile;
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async getProfileByUserId(id: string) {
    try {
      const profile = await this.prisma.profile.findFirst({
        where: {
          userId: id,
        },
      });

      if (!profile) {
        return null;
      }

      return profile;
    } catch (error) {
      Logger.error(error);
      throw new NotFoundException('You have no profile yet');
    }
  }

  async updateProfile(dto: updateProfileDto) {
    const user: User = this.cls.get('user');
    const existingProfile = await this.getProfileByUserId(user.id);

    if (!existingProfile) {
      throw new NotFoundException('Profile does not exist');
    }
    const newBirthday = dto.birthday;

    if (newBirthday) {
      const { horoscope, zodiac, birthdate } =
        await horoscopeZodiac(newBirthday);

      if (!horoscope) throw new BadRequestException('Invalid birthday input!');

      if (!zodiac) {
        throw new BadRequestException(
          "We're sorry, your age does not fit our policy",
        ); // that get horoscope zodiac function also set this api age policy
      }

      try {
        const updatedProfile = await this.prisma.profile.update({
          where: {
            id: existingProfile.id,
          },
          data: {
            name: dto.name,
            gender: dto.gender,
            birthday: birthdate,
            horoscope: horoscope,
            zodiac: zodiac,
            height: dto.height,
            weight: dto.weight,
            userId: user.id,
            interest: dto.interest,
          },
        });

        return updatedProfile;
      } catch (error) {
        Logger.error(error);
        throw new InternalServerErrorException('Something went wrong!');
      }
    } else {
      try {
        const updatedProfile = await this.prisma.profile.update({
          where: {
            id: existingProfile.id,
          },
          data: {
            name: dto.name,
            gender: dto.gender,
            height: dto.height,
            weight: dto.weight,
            userId: user.id,
            interest: dto.interest,
          },
        });

        return updatedProfile;
      } catch (error) {
        Logger.error(error);
        throw new InternalServerErrorException('Something went wrong!');
      }
    }
  }

  async deleteProfile() {
    const user: User = this.cls.get('user');

    const existingProfile = await this.getProfileByUserId(user.id);

    if (!existingProfile) {
      throw new NotFoundException('You have no profile yet');
    }

    try {
      await this.prisma.profile.delete({
        where: {
          id: existingProfile.id,
        },
      });

      return {
        success: 'Profile deleted',
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
