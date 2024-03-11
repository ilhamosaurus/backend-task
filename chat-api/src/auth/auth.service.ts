import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto, RegisterSchema, SignInDto, SignInSchema } from './dto';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const validateUser = await RegisterSchema.safeParseAsync(dto);

    if (!validateUser.success) {
      return {
        message: 'Register invalid',
        statusCode: 400,
      };
    }

    const user = validateUser.data;

    const existingUsername = await this.userService.getUserbyUsername(
      user.username,
    );

    const existingEmail = await this.userService.getUserbyEmail(user.email);

    if (existingUsername || existingEmail) {
      return {
        message: 'Username or email already taken',
        statusCode: 400,
      };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    try {
      const newUser = await this.prisma.user.create({
        data: {
          username: user.username,
          email: user.email,
          password: hashedPassword,
        },
      });

      const responseData = {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      };

      return {
        message: 'User created',
        data: responseData,
      };
    } catch (error) {
      Logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login(dto: SignInDto) {
    const valisateUser = await SignInSchema.safeParseAsync(dto);

    if (!valisateUser.success) return { message: 'Invalid data' };

    const user = valisateUser.data;

    const existingUser = await this.userService.getUserbyEmail(user.email);

    if (!existingUser) throw new ForbiddenException('Invalid credentials');

    const passwordMatch = await bcrypt.compare(
      user.password,
      existingUser.password,
    );

    if (!passwordMatch) throw new ForbiddenException('Invalid credentials');

    return this.generateJwt(
      existingUser.id,
      existingUser.username,
      existingUser.email,
    );
  }

  async generateJwt(userId: string, username: string, email: string) {
    const payload = {
      sub: username,
      email,
      id: userId,
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret,
    });

    return { token };
  }
}
