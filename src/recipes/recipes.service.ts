import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeDocument } from './documents/recipes.document';
import { Recipe } from './entities/recipe.entity';
import { FavoriteRecipeDto } from './dto/favorite-recipe.dto';
import { FavoriteDocument } from './documents/favorites.document';

@Injectable()
export class RecipesService {
  constructor(
    private recipeDocument: RecipeDocument,
    private favoriteDocument: FavoriteDocument
    ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = new Recipe(createRecipeDto.title, createRecipeDto.basePortion, 
      createRecipeDto.ingredients, createRecipeDto.instructions, 
      createRecipeDto.preparationTime, createRecipeDto.imageUrl)
    return this.recipeDocument.create(recipe)
  }

  async favorite(token: string, recipeId: string): Promise<FavoriteRecipeDto> {
    const recipe = await this.findOne(recipeId)
    return this.favoriteDocument.favorite(recipe, token)
  }


  async findFavorites(token: string): Promise<FavoriteRecipeDto[]>{
    return this.favoriteDocument.findFavorites(token);
  }

  async findAll(): Promise<Recipe[]>{
    return this.recipeDocument.findAll();
  }

  async findOne(id: string): Promise<Recipe> {
   return this.recipeDocument.findOne(id);
  }

  async deleteFavorite(token: string, recipeId: string) {
    return this.favoriteDocument.deleteFavorite(token, recipeId);
  }
}
