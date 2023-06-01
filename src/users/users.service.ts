import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './documents/users.document';
import { User } from './entities/user.entity';
import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
    constructor(private userDocument: UserDocument) {}
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User(createUserDto.name, createUserDto.email, 
          createUserDto.password)
        return this.userDocument.create(user)
      }
    
      async findAll(): Promise<User[]>{
        return this.userDocument.findAll();
      }
    
      async findOne(id: string): Promise<User> {
       return this.userDocument.findOne(id);
      }

      async findWithToken(token: string): Promise<User>{
        return this.userDocument.findWithToken(token);
      }
    
      remove(id: string) {
        this.userDocument.delete(id);
        return `The user #${id} was removed successfully`;
      }
}
