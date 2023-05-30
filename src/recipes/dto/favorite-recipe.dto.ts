export class FavoriteRecipeDto {
  recipeId: string;
  userId: string;
  title: string;
  basePortion: number;
  imageUrl: string;
  preparationTime: number;

  constructor(
    title: string, basePortion: number, preparationTime: number, imageUrl: string, recipeId: string, userId: string
  ) {
    this.title = title;
    this.basePortion = basePortion;
    this.imageUrl = imageUrl;
    this.preparationTime = preparationTime;
    this.userId = userId;
    this.recipeId = recipeId;
  }
}