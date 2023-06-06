import { Module } from '@nestjs/common';
import { ShoplistsController } from './shoplists.controller';
import { ShoplistsService } from './shoplists.service';
import { ShoplistDocument } from './documents/shoplist.document';

@Module({
  controllers: [ShoplistsController],
  providers: [ShoplistsService, ShoplistDocument],
})
export class ShoplistsModule {}
