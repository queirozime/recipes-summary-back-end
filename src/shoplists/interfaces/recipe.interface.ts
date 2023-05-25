import { Ingredient } from "./ingredient.interface";

export interface Recipe {
  title: string;
  basePortion: number;
  portion: number;
  ingredients: Ingredient[];
}