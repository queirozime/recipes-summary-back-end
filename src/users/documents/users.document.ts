import { Inject, Injectable, Scope } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CollectionReference, DocumentData, QueryDocumentSnapshot } from "@google-cloud/firestore";
import * as admin from 'firebase-admin';

require('dotenv').config();

const credencials = JSON.parse(process.env.SB_KEY); 

admin.initializeApp({
  credential: admin.credential.cert(credencials),
});

@Injectable({scope: Scope.REQUEST})
export class UserDocument {
  static collectionName = 'users';
  
  private userConverter = { // Conversor de objetos Firebase
    toFirestore(user: User): DocumentData {
      return {  
        name: user.getName(),
        email:user.getEmail(),
        uid: user.getUid(),
      }
    },
    //TODO: Alterar método fromFirestore para retornar User[]
    fromFirestore(snapshot: QueryDocumentSnapshot): User {
      const data = snapshot.data();
      return new User(data.name,data.email,data.uid);
    }
  };

  constructor(
    @Inject(UserDocument.collectionName)
    private userCollection: CollectionReference<UserDocument>
  ) {}

  async create(user: User): Promise<User> {
    const snapshot = await this.userCollection.withConverter(this.userConverter).add(user);
    user.setUid(snapshot.id);
    return user;
  }

  async findAll(): Promise<User[]> {
    const snapshot = await this.userCollection.withConverter(this.userConverter).get();
    const users: User[] = [];
    snapshot.forEach(doc => {
      let user = doc.data();
      user.setUid(doc.id);
      users.push(user);
    });
    return users;
  }

async findOne(token: string): Promise<User> {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const query = this.userCollection.withConverter(this.userConverter).where('uid', '==', uid);
    const snapshot = await query.get();

    if (snapshot.empty) {
      console.log('Nenhum usuário encontrado com esse UID.');
      return null; // or return any default value as per your requirement
    }

    let user: User = null;
    // Iterating over the documents returned
    snapshot.forEach(doc => {
      console.log('Usuário encontrado:', doc.id, doc.data());
      user = doc.data();
    });
    return user;
  } catch (error) {
    console.log(error);
    return null; // or return any default value as per your requirement
  }
}

  async delete(id: string) {
    await this.userCollection.withConverter(this.userConverter).doc('/' + id).delete();
  }
}


