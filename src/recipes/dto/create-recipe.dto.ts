export class createRecipeDto {
  title: string;
  preparationTime: number;
  basePortion: number;
  imageUrl: string;
  ingredients: Array<Ingredient>;
  instructions: Array<string>;
}

export class Ingredient {
  name: string;
  qty: number;
  unit: string;
}