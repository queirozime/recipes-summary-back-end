import { Timestamp } from "@google-cloud/firestore";

export class Shoplist {
  static collectionName = 'Shoplists';

  name: string;
  favorite: boolean;
  lastAlterationDate: Timestamp;
  weights: number[];
  ingredients: object[];
  recipes: object[];
}
