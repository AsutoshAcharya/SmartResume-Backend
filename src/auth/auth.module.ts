import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({ controllers: [AuthController], providers: [AuthService] }) //decorator
class AuthModule {}

export default AuthModule;
