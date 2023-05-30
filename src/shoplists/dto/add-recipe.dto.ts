import { Recipe } from "../interfaces/recipe.interface";

export class AddRecipeDto {
  shoplistId: string;
  recipe: Recipe;
}
