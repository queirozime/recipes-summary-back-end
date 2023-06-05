import { Injectable } from '@nestjs/common';
import { Firestore } from '@google-cloud/firestore';
import * as admin from 'firebase-admin';



@Injectable()
export class TokenVerificationService {
  private firestore: Firestore;
  private uid: string;

  constructor() {

    this.firestore = admin.firestore();
  }

  async verifyToken(tokenId: string): Promise<boolean> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(tokenId);
      this.uid = decodedToken.uid; 
      // You can also check additional claims or perform custom validations here
      return !!decodedToken; // Return true if the UID exists
    } catch (error) {
      // Token verification failed
      return false;
    }
  }
  getuid(): string {
    return this.uid;
  }
}
