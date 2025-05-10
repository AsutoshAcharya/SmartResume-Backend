import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import AuthModule from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ResumeModule } from './resume/resume.module';
import 'dotenv/config';
import { JwtStrategy } from './user/strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGO_URI!),
    ResumeModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
