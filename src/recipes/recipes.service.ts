import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeDocument } from './documents/recipes.document';
import { Recipe } from './entities/recipe.entity';
import { FavoriteRecipeDto } from './dto/favorite-recipe.dto';
import { FavoriteDocument } from './documents/favorites.document';
import { ResponseRecipeDto } from './dto/response-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    private recipeDocument: RecipeDocument,
    private favoriteDocument: FavoriteDocument
    ) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<ResponseRecipeDto> {
    const recipe = new Recipe(
      createRecipeDto.title, 
      createRecipeDto.basePortion, 
      createRecipeDto.ingredients, 
      createRecipeDto.instructions, 
      createRecipeDto.preparationTime, 
      createRecipeDto.imageUrl)
    return this.recipeDocument.create(recipe)
  }

  async favorite(token: string, recipeId: string): Promise<FavoriteRecipeDto> {
    const recipe = await this.findOne(recipeId)
    return this.favoriteDocument.favorite(token, recipe)
  }


  async findFavorites(token: string): Promise<FavoriteRecipeDto[]>{
    return this.favoriteDocument.findFavorites(token);
  }

  async findAll(token: string): Promise<ResponseRecipeDto[]>{
    const recipes = await this.recipeDocument.findAll();
    const favorites = await this.favoriteDocument.findFavorites(token);
    const responseRecipeDtoList: ResponseRecipeDto[] = [];
    recipes.forEach( recipe => {
      const responseRecipeDto = new ResponseRecipeDto(recipe);
      if(favorites.some( favorite => recipe.getId == favorite.getRecipeId))
        responseRecipeDto.favorite = true;
      return responseRecipeDtoList.push(responseRecipeDto)
    })
    return responseRecipeDtoList;
  }

  async findOne(id: string): Promise<ResponseRecipeDto> {
    const recipe = await this.recipeDocument.findOne(id);
    const responseRecipeDto = new ResponseRecipeDto(recipe)
    return responseRecipeDto;
  }

  async disfavor(token: string, recipeId: string) {
    return this.favoriteDocument.disfavor(token, recipeId);
  }
}
