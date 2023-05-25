import { Timestamp } from "@google-cloud/firestore";

export class Shoplist {
  static collectionName = 'Shoplists';

  title: string;
  favorite: boolean;
  lastAlterationDate: Timestamp;
  ingredients: object[];
  recipes: object[];
}
