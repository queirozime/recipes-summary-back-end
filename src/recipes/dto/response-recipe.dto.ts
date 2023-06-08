import { Ingredient } from "../../shoplists/interfaces/ingredient.interface";
import { Recipe } from "../entities/recipe.entity";

export class ResponseRecipeDto {
  title: string;
  preparationTime: number;
  basePortion: number;
  imageUrl: string;
  ingredients: Ingredient[];
  instructions: string[];
  favorite: boolean;
  id: string;

  constructor(recipe: Recipe) {
    this.title = recipe.getTitle();
    this.preparationTime = recipe.getPreparationTime();
    this.basePortion = recipe.getBasePortion();
    this.imageUrl = recipe.getImageUrl();
    this.ingredients = recipe.getIngredients();
    this.instructions = recipe.getInstructions();
    this.favorite = false;
    this.id = recipe.getId()
  }
}
