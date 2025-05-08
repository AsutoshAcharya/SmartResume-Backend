import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import AuthModule from './auth/auth.module';

@Module({
  imports: [AuthModule, UserModule, BookmarkModule],
})
export class AppModule {}
