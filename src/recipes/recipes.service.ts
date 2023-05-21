import { Inject, Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { RecipeDocument } from './documents/recipes.document';
import { CollectionReference } from '@google-cloud/firestore';

@Injectable()
export class RecipesService {
  constructor(
    @Inject(RecipeDocument.collectionName)
    private recipesCollection: CollectionReference<RecipeDocument>,
  ) {}

  create(createRecipeDto: CreateRecipeDto) {
    return 'This action adds a new recipe';
  }

  async findAll(): Promise<RecipeDocument[]>{
    const snapshot = await this.recipesCollection.get();
    const recipes: RecipeDocument[] = [];
    snapshot.forEach(doc => recipes.push(doc.data()));
    return recipes;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
