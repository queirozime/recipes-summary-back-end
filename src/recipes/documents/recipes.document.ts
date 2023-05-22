export class Recipe {
  static collectionName = 'Recipes';

  title: string;
  portion: number;
  instructions: object[];
  ingredients: number;
  imageUrl: string;
}