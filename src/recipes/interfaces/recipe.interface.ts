import { Ingredient } from "../../shoplists/interfaces/ingredient.interface";

export interface Recipe {
  id: string;
  title: string;
  basePortion: number;
  ingredients: Ingredient[];
  imageUrl: string;
  instructions: string[];
  preparationTime: number;
}