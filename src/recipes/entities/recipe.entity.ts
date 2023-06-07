import { Ingredient } from "../../shoplists/interfaces/ingredient.interface";

export class Recipe {
  private id: string;
  private title: string;
  private basePortion: number;
  private ingredients: Ingredient[];
  private imageUrl: string;
  private instructions: string[];
  private preparationTime: number;

  constructor(
    title: string, basePortion: number, ingredients: Ingredient[], 
    instructions: string[], preparationTime: number, imageUrl?: string
  ) {
    this.title = title;
    this.basePortion = basePortion;
    this.ingredients = ingredients;
    this.imageUrl = imageUrl;
    this.instructions = instructions;
    this.preparationTime = preparationTime;
  }

  // Getters e Setters
  setId(id: string) {
    this.id = id;
  }
  
  setImageUrl(url: string) {
    this.imageUrl = url;
  }

  getId() {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getBasePortion(): number {
    return this.basePortion;
  }

  getImageUrl(): string {
    return this.imageUrl;
  }

  getPreparationTime(): number {
    return this.preparationTime;
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  getInstructions(): string[] {
    return this.instructions;
  }

}
