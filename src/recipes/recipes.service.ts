import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { RecipeDocument } from './documents/recipes.document';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipesService {
  constructor(private recipeDocument: RecipeDocument) {}

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const recipe = new Recipe(createRecipeDto.title, createRecipeDto.basePortion, 
      createRecipeDto.ingredients, createRecipeDto.instructions, 
      createRecipeDto.preparationTime, createRecipeDto.imageUrl)
    return this.recipeDocument.create(recipe)
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
