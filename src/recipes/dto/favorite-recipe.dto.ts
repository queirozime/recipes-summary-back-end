export class FavoriteRecipeDto {
  id: string;
  recipeId: string;
  userId: string;
  title: string;
  basePortion: number;
  imageUrl: string;
  preparationTime: number;

  constructor(
    title: string, 
    basePortion: number, 
    preparationTime: number, 
    imageUrl: string, 
    recipeId: string, 
    userId: string
  ) {
    this.title = title;
    this.basePortion = basePortion;
    this.imageUrl = imageUrl;
    this.preparationTime = preparationTime;
    this.imageUrl = imageUrl;
    this.userId = userId;
    this.recipeId = recipeId;
  }

  setId(id: string ) {
    this.id = id;
  }

  getId() {
    return this.id;
  }

  getRecipeId() {
    return this.recipeId;
  }
}