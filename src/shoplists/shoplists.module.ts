import { Module } from '@nestjs/common';
import { ShoplistsService } from './shoplists.service';
import { ShoplistsController } from './shoplists.controller';
import { ShoplistDocument } from './documents/shoplist.document';

@Module({
  controllers: [ShoplistsController],
  providers: [ShoplistsService, ShoplistDocument]
})
export class ShoplistsModule {}
