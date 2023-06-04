import { User } from "../entities/user.entity";
import { CollectionReference, QueryDocumentSnapshot } from "@google-cloud/firestore";
export declare class UserDocument {
    private userCollection;
    static collectionName: string;
    private userConverter;
    constructor(userCollection: CollectionReference<UserDocument>);
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findDocument(token: string): Promise<QueryDocumentSnapshot<User>>;
    findOne(token: string): Promise<User>;
    delete(token: string): Promise<string>;
}
