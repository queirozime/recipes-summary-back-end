import { Timestamp } from "@google-cloud/firestore";

export class CreateShoplistDto {
  name: string;
  favorite: boolean;
  lastAlterationDate: Timestamp;
  weights: number[];
  recipes: object[];
}
