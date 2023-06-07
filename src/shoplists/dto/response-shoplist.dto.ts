import { Recipe } from "../interfaces/recipe.interface";
import { Ingredient } from "../interfaces/ingredient.interface";
import { Timestamp } from "@google-cloud/firestore";
import { Shoplist } from "../entities/shoplist.entity";

export class ResponseShoplistDto {
  shoplistId: string;
  title: string;
  favorite: boolean;
  lastAlterationDate: Timestamp;
  recipes: Recipe[];
  ingredients: Ingredient[];

  constructor(shoplist: Shoplist) {
    this.shoplistId = shoplist.getShoplistId();
    this.title = shoplist.getTitle();
    this.favorite = shoplist.isFavorite();
    this.lastAlterationDate = shoplist.getLastAlterationDate();
    this.recipes = shoplist.getRecipes();
    this.ingredients   = shoplist.getIngredients();
  }
}
