import { Ingredient } from "../../shoplists/interfaces/ingredient.interface";

export class CreateRecipeDto {
  title: string;
  preparationTime: number;
  basePortion: number;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: string[];
}
