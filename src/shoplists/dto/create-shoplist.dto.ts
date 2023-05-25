import { Timestamp } from "@google-cloud/firestore";
import { Recipe } from "../interfaces/recipe.interface";

export class CreateShoplistDto {
  title: string;
  favorite: boolean;
  lastAlterationDate: Timestamp;
  recipes: Recipe[];
}
