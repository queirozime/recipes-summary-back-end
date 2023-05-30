import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeDocument } from './documents/recipes.document';
import { Recipe } from './entities/recipe.entity';
import { AccessTokenDto } from './dto/access-token.dto';
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

  async favorite(accessTokenDto: AccessTokenDto, recipeId: string): Promise<FavoriteRecipeDto> {
    const recipe = await this.findOne(recipeId)
    return this.favoriteDocument.favorite(recipe, accessTokenDto.accessToken)
  }


  async findFavorites(accessTokenDto: AccessTokenDto): Promise<FavoriteRecipeDto[]>{
    return this.favoriteDocument.findFavorites(accessTokenDto.accessToken);
  }

  async findAll(): Promise<Recipe[]>{
    return this.recipeDocument.findAll();
  }

  async findOne(id: string): Promise<Recipe> {
   return this.recipeDocument.findOne(id);
  }

  remove(id: string) {
    this.recipeDocument.delete(id);
    return `The recipe #${id} was removed successfully`;
  }
}
