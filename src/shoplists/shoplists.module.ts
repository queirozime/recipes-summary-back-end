import { Module } from "@nestjs/common";
import { ShoplistsController } from "./shoplists.controller";
import { ShoplistsService } from "./shoplists.service";
import { ShoplistDocument } from "./documents/shoplist.document";
import { AuthService } from "src/firestore/auth.service";

@Module({
  controllers: [ShoplistsController],
  providers: [ShoplistsService, ShoplistDocument, AuthService],
})
export class ShoplistsModule {}
