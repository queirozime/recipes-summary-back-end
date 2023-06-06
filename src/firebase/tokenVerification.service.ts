import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';


@Injectable()
export class TokenVerificationService {
  constructor() {}

  async verifyToken(tokenId: string): Promise<string|boolean> {
    try {
      const decodedToken = await admin.auth().verifyIdToken(tokenId);
      // You can also check additional claims or perform custom validations here
      return decodedToken.uid; // Return true if the UID exists
    } catch (error) {
      // Token verification failed
      return false;
    }
  }
}
