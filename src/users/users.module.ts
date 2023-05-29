import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ShoplistDocument } from 'src/shoplists/documents/shoplist.document';

@Module({
  controllers: [UsersController],
  providers: [UsersService, ShoplistDocument]
})
export class UsersModule {}
