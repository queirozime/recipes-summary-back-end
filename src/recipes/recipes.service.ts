import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeDocument } from './documents/recipes.document';
import { Recipe } from './entities/recipe.entity';
import { FavoriteRecipeDto } from './dto/favorite-recipe.dto';
import { FavoriteDocument } from './documents/favorites.document';
import { ResponseRecipeDto } from './dto/response-recipe.dto';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { initializeApp } from 'firebase/app';

@Injectable()
export class RecipesService {
  private storage;
  constructor(
    private recipeDocument: RecipeDocument,
    private favoriteDocument: FavoriteDocument
    ) {
      const firebaseConfig = {
        apiKey: "AIzaSyBwG49qhxOhj4vm1p4zNwM3UGfhHEA2FM0",
        authDomain: "cozinhex.firebaseapp.com",
        projectId: "cozinhex",
        storageBucket: "cozinhex.appspot.com",
        messagingSenderId: "162587160055",
        appId: "1:162587160055:web:4b73e462ffc8402d8952f2",
        measurementId: "G-PRPZBWSNCD"
      };
      initializeApp(firebaseConfig);
      this.storage = getStorage();
    }

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
    const dbRecipes = await this.favoriteDocument.findFavorites(token);
    await Promise.all(dbRecipes.map(async (recipe: FavoriteRecipeDto) => {
      const url = await recipe.createAcessibleUrl(this.storage);
      recipe.setImageUrl(url);
    })); 
    return dbRecipes;
  }

  async findAll(token: string): Promise<ResponseRecipeDto[]>{
    const recipes = await this.recipeDocument.findAll();
    const responseRecipeDtoList: ResponseRecipeDto[] = [];
    if(!token) {
      const favorites = await this.favoriteDocument.findFavorites(token);
      await Promise.all(recipes.map(async (recipe: Recipe) => {
        const url = await recipe.createAcessibleUrl(this.storage);
        recipe.setImageUrl(url);
        const responseRecipeDto = new ResponseRecipeDto(recipe);
        if(!!favorites && favorites.some( favorite => {
          return recipe.getId() == favorite.getRecipeId()}))
          responseRecipeDto.favorite = true;
        responseRecipeDtoList.push(responseRecipeDto);
      })); 
    }
    else {
      await Promise.all(recipes.map(async (recipe: Recipe) => {
        const url = await recipe.createAcessibleUrl(this.storage);
        recipe.setImageUrl(url);
        responseRecipeDtoList.push(new ResponseRecipeDto(recipe));
      })); 
    }
    return responseRecipeDtoList;
  }

  async findOne(id: string): Promise<ResponseRecipeDto> {
    const recipe = await this.recipeDocument.findOne(id);
    if(!!recipe) {
      const url = await recipe.createAcessibleUrl(this.storage);
      recipe.setImageUrl(url);
      const responseRecipeDto = new ResponseRecipeDto(recipe)
      return responseRecipeDto;
    }
    else throw new BadRequestException ("Receita não encontrada");
  }

  async disfavor(token: string, recipeId: string) {
    return this.favoriteDocument.disfavor(token, recipeId);
  }
}
