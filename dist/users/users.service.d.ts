import { CreateUserDto } from './dto/create-user.dto';
import { UserDocument } from './documents/users.document';
import { User } from './entities/user.entity';
export declare class UsersService {
    private userDocument;
    constructor(userDocument: UserDocument);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(token: string): Promise<User>;
    remove(token: string): Promise<string>;
}
