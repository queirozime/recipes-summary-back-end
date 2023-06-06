import { Inject, Injectable, Scope } from "@nestjs/common";
import { User } from "../entities/user.entity";
import {
  CollectionReference,
  DocumentData,
  QueryDocumentSnapshot,
} from "@google-cloud/firestore";
import { TokenVerificationService } from "src/firebase/tokenVerification.service";
//import * as admin from "firebase-admin";

@Injectable({ scope: Scope.REQUEST })
export class UserDocument {
  static collectionName = "users";
  private tokenVerification:TokenVerificationService;
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
  ) { this.tokenVerification = new TokenVerificationService();}

  async create(user: User): Promise<User> {
    const snapshot = await this.userCollection
      .withConverter(this.userConverter)
      .add(user);
    user.setUid(snapshot.id);
    return user;
  }

  async findAll(): Promise<User[]> {
    const snapshot = await this.userCollection
      .withConverter(this.userConverter)
      .get();
    const users: User[] = [];
    snapshot.forEach((doc) => {
      let user = doc.data();
      user.setUid(doc.id);
      users.push(user);
    });
    return users;
  }

  async findDocument(token: string): Promise<QueryDocumentSnapshot<User>> {
    try {
      const uid = await this.tokenVerification.verifyToken(token);
      if (uid) {
        const query = this.userCollection
          .withConverter(this.userConverter)
          .where("uid", "==", uid);
        const snapshot = await query.get();

        if (snapshot.empty) {
          console.log("Nenhum usuário encontrado com esse UID.");
          return null;
        }

        let document: QueryDocumentSnapshot<User> = null;

        // Iterating over the documents returned
        snapshot.forEach((doc) => {
          document = doc;
        });
        return document;
      }
      else {
        console.log("Token invalido")
      }
    } catch (error) {
      console.log(error);
      return null; // or return any default value as per your requirement
    }
  }

  async findOne(token: string): Promise<User> {
    const doc = await this.findDocument(token);
    if(!doc){
      return;
    }
    const user = doc.data() as User;
    // Iterating over the documents returned
    console.log("Usuário encontrado:", doc.id, user);
    return user;
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
