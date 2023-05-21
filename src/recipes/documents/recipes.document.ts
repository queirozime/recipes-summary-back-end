import { Timestamp } from '@google-cloud/firestore';

export class RecipeDocument {
  static collectionName = 'Recipes';

  name: string;
  dueDate: Timestamp;
}