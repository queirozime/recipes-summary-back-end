import { Inject, Injectable, Scope } from "@nestjs/common";
import { Recipe } from "../entities/recipe.entity";
import { CollectionReference, DocumentData, QueryDocumentSnapshot } from "@google-cloud/firestore";

@Injectable({scope: Scope.REQUEST})
export class RecipeDocument {
  static collectionName = 'Recipes';
  
  private recipeConverter = { // Conversor de objetos Firebase
    toFirestore(recipe: Recipe): DocumentData {
      return {  
        title: recipe.getTitle(),
        basePortion: recipe.getBasePortion(),
        ingredients: recipe.getIngredients(),
        imageUrl: recipe.getImageUrl(),
        instructions: recipe.getInstructions(),
        preparationTime: recipe.getPreparationTime(),
      }
    },
    //TODO: Alterar método fromFirestore para retornar Recipe[]
    fromFirestore(snapshot: QueryDocumentSnapshot): Recipe {
      const data = snapshot.data();
      return new Recipe(data.title, data.basePortion, data.ingredients, 
        data.instructions, data.preparationTime, data.imageUrl);
    }
  };

  constructor(
    @Inject(RecipeDocument.collectionName)
    private recipeCollection: CollectionReference<RecipeDocument>
  ) {}

  async create(recipe: Recipe): Promise<Recipe> {
    const snapshot = await this.recipeCollection.withConverter(this.recipeConverter).add(recipe);
    recipe.setId(snapshot.id);
    return recipe;
  }

  async findAll(): Promise<Recipe[]> {
    const snapshot = await this.recipeCollection.withConverter(this.recipeConverter).get();
    const recipes: Recipe[] = [];
    snapshot.forEach(doc => {
      let recipe = doc.data()
      recipe.setId(doc.id)
      recipes.push(recipe)
    });
    return recipes;
  }

  async findOne(id: string): Promise<Recipe> {
    const snapshot = await this.recipeCollection.withConverter(this.recipeConverter).doc('/' + id).get();
    let recipe = snapshot.data();
    recipe.setId(snapshot.id)
    return recipe;
  }

  async delete(id: string) {
    await this.recipeCollection.withConverter(this.recipeConverter).doc('/' + id).delete();
  }
}


