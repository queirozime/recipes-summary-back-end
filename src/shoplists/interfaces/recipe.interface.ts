import { Ingredient } from "./ingredient.interface";

export interface Recipe {
  id: string;
  title: string;
  portion: number;
  basePortion: number;
  ingredients: Ingredient[];
}