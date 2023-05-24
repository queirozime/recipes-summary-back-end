import { Module } from '@nestjs/common';
import { ShoplistsService } from './shoplists.service';
import { ShoplistsController } from './shoplists.controller';

@Module({
  controllers: [ShoplistsController],
  providers: [ShoplistsService]
})
export class ShoplistsModule {}
