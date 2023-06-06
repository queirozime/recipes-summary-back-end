import { Recipe } from "../interfaces/recipe.interface";

export class CreateShoplistDto {
  userId:string;
  token: string;
  title: string;
  favorite: boolean;
  recipes: Recipe[];
}
