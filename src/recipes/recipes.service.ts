import { Inject, Injectable } from '@nestjs/common';
import { Recipe } from './documents/recipes.document';
import { CollectionReference, DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import { createRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(
    @Inject(Recipe.collectionName)
    private recipesCollection: CollectionReference<Recipe>,
  ) {}

  async findAll(): Promise<Recipe[]>{
    const snapshot: QuerySnapshot<Recipe> = await this.recipesCollection.get()
    const recipes: Recipe[] = []
    snapshot.forEach(doc => recipes.push(doc.data()))
    return recipes
  }

  async findOne(id: number): Promise<Recipe> {
    const doc: DocumentSnapshot<Recipe> = await this.recipesCollection.doc('/' + id).get()
    const recipe: Recipe = doc.data()
    return recipe
  }
}
