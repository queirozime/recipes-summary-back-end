import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDocument } from "./documents/users.document";
import { User } from "./entities/user.entity";
import * as admin from "firebase-admin";

@Injectable()
export class UsersService {
  constructor(private userDocument: UserDocument) {}
  async create(createUserDto: CreateUserDto, token: string): Promise<User> {
    const user = new User(
      createUserDto.name,
      createUserDto.email,
    );
    return this.userDocument.create(user, token);
  }

  async findAll(): Promise<User[]> {
    return this.userDocument.findAll();
  }

  async findOne(token: string): Promise<User> {
    return await this.userDocument.findOne(token);
  }

  async remove(token: string) {
    return this.userDocument.delete(token);
  }
}
