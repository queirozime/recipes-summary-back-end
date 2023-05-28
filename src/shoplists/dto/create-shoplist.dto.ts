import { Recipe } from "../interfaces/recipe.interface";

export class CreateShoplistDto {
  title: string;
  favorite: boolean;
  recipes: Recipe[];
}
