import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserDocument } from "./documents/users.document";
import { AuthService } from "src/firebase/auth.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserDocument, AuthService],
})
export class UsersModule {}
