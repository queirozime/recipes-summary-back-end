import { Inject, Injectable, Scope } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CollectionReference, DocumentData, QueryDocumentSnapshot } from "@google-cloud/firestore";

@Injectable({scope: Scope.REQUEST})
export class UserDocument {
  static collectionName = 'users';
  
  private userConverter = { // Conversor de objetos Firebase
    toFirestore(user: User): DocumentData {
      return {  
        name: user.getName(),
        email:user.getEmail(),
      }
    },
    //TODO: Alterar método fromFirestore para retornar User[]
    fromFirestore(snapshot: QueryDocumentSnapshot): User {
      const data = snapshot.data();
      return new User(data.name,data.email,data.password);
    }
  };

  constructor(
    @Inject(UserDocument.collectionName)
    private userCollection: CollectionReference<UserDocument>
  ) {}

  async create(user: User): Promise<User> {
    const snapshot = await this.userCollection.withConverter(this.userConverter).add(user);
    user.setId(snapshot.id);
    return user;
  }

  async findAll(): Promise<User[]> {
    const snapshot = await this.userCollection.withConverter(this.userConverter).get();
    const users: User[] = [];
    snapshot.forEach(doc => {
      let user = doc.data()
      user.setId(doc.id)
      users.push(user)
    });
    return users;
  }

  async findOne(id: string): Promise<User> {
    const snapshot = await this.userCollection.withConverter(this.userConverter).doc('/' + id).get();
    let user = snapshot.data();
    user.setId(snapshot.id)
    return user;
  }

  async delete(id: string) {
    await this.userCollection.withConverter(this.userConverter).doc('/' + id).delete();
  }
}


