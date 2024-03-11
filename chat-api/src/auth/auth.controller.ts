import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodPipe } from 'src/zod/zod.pipe';
import { RegisterDto, RegisterSchema, SignInDto, SignInSchema } from './dto';

@Controller('/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodPipe(RegisterSchema))
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @UsePipes(new ZodPipe(SignInSchema))
  async login(@Body() dto: SignInDto) {
    return this.authService.login(dto);
  }
}
