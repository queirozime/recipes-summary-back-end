import { Injectable } from "@nestjs/common";
import { auth } from "firebase-admin";

@Injectable()
export class AuthService {
  constructor() {}

  async verifyToken(tokenId: string): Promise<boolean> {
    try {
      const decodedToken = await auth().verifyIdToken(tokenId);
      return !!decodedToken;
    } catch (error) {
      return false;
    }
  }

  async getuid(tokenId: string): Promise<string> {
    const decodedToken = await auth().verifyIdToken(tokenId);
    return decodedToken.uid;
  }

  async verifyTokenAndReturnUid(tokenId: string): Promise<string> {
    try {
      const decodedToken = await auth().verifyIdToken(tokenId);
      return decodedToken.uid;
    } catch (error) {
      return null;
    }
  }
}
