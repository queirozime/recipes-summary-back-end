import { Recipe } from "../interfaces/recipe.interface";
import { Ingredient } from "../interfaces/ingredient.interface";
import { Timestamp } from "@google-cloud/firestore";

export class Shoplist {
  private id: string;
  private title: string;
  private favorite: boolean;
  private lastAlterationDate: Timestamp;
  private recipes: Recipe[];
  private ingredients: Ingredient[];

  constructor(title: string, favorite: boolean, recipes: Recipe[]) {
    this.title = title;
    this.favorite = favorite;
    this.recipes = recipes;
    this.ingredients = [];
    this.updateLastAlteraionDate();
    this.setIngredients();
  }

  // Getters e Setters
  setId(id: string) {
    this.id = id;
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
  private updateLastAlteraionDate() {
    this.lastAlterationDate = Timestamp.now();
  }

  private setIngredients() {
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
      const index = this.ingredients.findIndex((target) => element.name === target.name && element.unit === target.unit);
      if (index !== -1) this.ingredients[index].qty += element.qty;
      else this.ingredients.push(element);
    });
  }
}
