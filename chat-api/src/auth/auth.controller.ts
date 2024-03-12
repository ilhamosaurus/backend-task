import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/zod/zod.pipe';
import {
  RegisterDto,
  RegisterResponse,
  RegisterSchema,
  ResponseSignIn,
  SignInDto,
  SignInSchema,
} from './dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({
    description: 'API for register',
    type: RegisterDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User created',
    type: RegisterResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'User email or username already exist',
  })
  @ApiResponse({
    status: 500,
    description: 'Something went wrong',
  })
  @UsePipes(new ZodPipe(RegisterSchema))
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiBody({
    description: 'API for login',
    type: SignInDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User login successfully',
    type: ResponseSignIn,
  })
  @ApiResponse({
    status: 403,
    description: 'Invalid credentials',
  })
  @UsePipes(new ZodPipe(SignInSchema))
  async login(@Body() dto: SignInDto) {
    return this.authService.login(dto);
  }
}
