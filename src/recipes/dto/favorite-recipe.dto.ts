import { getDownloadURL, ref } from "firebase/storage";

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
  setImageUrl(url:string){
    this.imageUrl = url;
  }
  async createAcessibleUrl(storage): Promise<string> {
  
    const filePath = this.imageUrl;
      if (filePath) {
        const starsRef = ref(storage, filePath);
  
        try {
          const url = await getDownloadURL(starsRef);
          return url;
        } catch (error) {
          console.error("Erro ao obter a URL pública:", error);
          return;
        }
      }
  }

}