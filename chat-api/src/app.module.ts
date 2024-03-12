import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ProfileModule } from './profile/profile.module';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    FileModule,
    ProfileModule,
    ClsModule.forRoot({ global: true, middleware: { mount: true } }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
