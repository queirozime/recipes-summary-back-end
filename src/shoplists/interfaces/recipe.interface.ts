import { Ingredient } from "./ingredient.interface";

export interface Recipe {
  id: string;
  title: string;
  basePortion: number;
  portion: number;
  ingredients: Ingredient[];
}