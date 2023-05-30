import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserDocument } from './documents/users.document';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserDocument]
})
export class UsersModule {}
