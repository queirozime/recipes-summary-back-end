import { Recipe } from "../interfaces/recipe.interface";
import { Ingredient } from "../interfaces/ingredient.interface";
import { Timestamp } from "@google-cloud/firestore";

export class Shoplist {
  private userId: string;
  private shoplistId: string;
  private title: string;
  private favorite: boolean;
  private lastAlterationDate: Timestamp;
  private recipes: Recipe[];
  private ingredients: Ingredient[];

  constructor(
    userId: string, title: string, favorite: boolean, recipes: Recipe[], 
    lastAlterationDate?: Timestamp, ingredients?: Ingredient[]
  ) {
    this.userId = userId;
    this.title = title;
    this.favorite = favorite;
    this.lastAlterationDate = lastAlterationDate || this.updateLastAlterationDate();
    this.recipes = recipes;
    this.ingredients = ingredients || this.setIngredients();
  }

  // Getters e Setters
  setShoplistId(shoplistId: string) {
    this.shoplistId = shoplistId;
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
  }

  setFavorite(state: boolean) {
    this.favorite = state;
  }

  getUserId(): string {
    return this.userId;
  }

  getTitle(): string {
    return this.title;
  }

  isFavorite(): boolean {
    return this.favorite;
  }

  getLastAlterationDate(): Timestamp {
    return this.lastAlterationDate;
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  // Regras de Negócio
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.ingredients = this.setIngredients();
  }

  private updateLastAlterationDate(): Timestamp {
    return Timestamp.now();
  }

  private setIngredients(): Ingredient[] {
    const shoplist: Ingredient[] = [];
    // Cria uma array com os ingredientes de todas as receitas de lista poderados pela porção
    const arr: Ingredient[] = this.recipes.reduce((accumulator, { basePortion, portion, ingredients }) => {
      const arr = ingredients.map((element) => {
        const weight = portion / basePortion;
        return {...element, qty: element.qty * weight};
      });
      return [...accumulator, ...arr];
    }, []);
    // Analisa a quantidade de ocorrências de cada ingrediente e soma suas quantidades
    arr.forEach((element) => {
      const index = shoplist.findIndex((target) => element.name === target.name && element.unit === target.unit);
      if (index !== -1) shoplist[index].qty += element.qty;
      else shoplist.push(element);
    });

    return shoplist;
  }
}
