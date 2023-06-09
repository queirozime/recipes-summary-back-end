import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from "@nestjs/common";
import { User } from "../entities/user.entity";
import {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
} from "@google-cloud/firestore";
import { AuthService } from "src/firebase/auth.service";

@Injectable({ scope: Scope.REQUEST })
export class UserDocument {
  static collectionName = "users";
  static authService: AuthService;
  private userConverter = {
    // Conversor de objetos Firebase
    toFirestore(user: User): DocumentData {
      return {
        name: user.getName(),
        email: user.getEmail(),
        uid: user.getUid(),
      };
    },
    //TODO: Alterar método fromFirestore para retornar User[]
    fromFirestore(snapshot: QueryDocumentSnapshot): User {
      const data = snapshot.data();
      return new User(data.name, data.email, data.uid);
    },
  };

  constructor(
    @Inject(UserDocument.collectionName)
    private userCollection: CollectionReference<UserDocument>,
    private authService: AuthService
  ) { this.authService = authService;}

  async create(user: User, token: string): Promise<User> {
    const uid = await this.authService.verifyTokenAndReturnUid(token);
    if(uid) {
      user.setUid(uid);
      await this.userCollection
        .withConverter(this.userConverter)
        .add(user);
      return user;
    }
    else throw new BadRequestException("Token não válido"); 
  }

  async findAll(): Promise<User[]> {
    try {
      const snapshot = await this.userCollection
        .withConverter(this.userConverter)
        .get();
      const users: User[] = [];
      if(!snapshot.empty)
        snapshot.forEach((doc) => {
          let user = doc.data();
          user.setUid(doc.id);
          users.push(user);
        });
      return users;
    }
    catch(error) {
      console.log(error);
      return null;
    }
  }

  async findDocument(token: string): Promise<QueryDocumentSnapshot<User>> {
    const uid = await this.authService.verifyTokenAndReturnUid(token);
    if (uid) {
      const query = this.userCollection.withConverter(this.userConverter).where("uid", "==", uid);
      const snapshot = await query.get();

      if (snapshot.empty)
        throw new NotFoundException("Nenhum usuário encontrado com esse UID."); 

      let document: QueryDocumentSnapshot<User> = null;

      snapshot.forEach((doc) => {
        document = doc;
      });
      return document;
    }
    else throw new BadRequestException("Token não válido"); 
  }

  async findOne(token: string): Promise<User> {
    const doc = await this.findDocument(token);
    if(!doc){
      return;
    }
    const user = doc.data() as User;
    if(user)
      return user;
    else return null;
  }

  async delete(token: string) {
    const doc = await this.findDocument(token);
    await this.userCollection
      .withConverter(this.userConverter)
      .doc("/" + doc.id)
      .delete();
    return `The user #${doc.data().getUid()} was removed successfully`;
  }
}
