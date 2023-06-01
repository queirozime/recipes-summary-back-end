import { User } from "../entities/user.entity";
import { CollectionReference } from "@google-cloud/firestore";
export declare class UserDocument {
    private userCollection;
    static collectionName: string;
    private userConverter;
    constructor(userCollection: CollectionReference<UserDocument>);
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(uid: string): Promise<User>;
    findWithToken(token: string): Promise<User>;
    delete(id: string): Promise<void>;
}
