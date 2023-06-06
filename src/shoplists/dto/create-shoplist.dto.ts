import { Recipe } from "../interfaces/recipe.interface";

export class CreateShoplistDto {
  token: string;
  title: string;
  favorite: boolean;
  recipes: Recipe[];
}
