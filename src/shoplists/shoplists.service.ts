import { Injectable } from "@nestjs/common";
import { CreateShoplistDto } from "src/shoplists/dto/create-shoplist.dto";
import { UpdateShoplistDto } from "src/shoplists/dto/update-shoplist.dto";
import { ShoplistDocument } from "src/shoplists/documents/shoplist.document";
import { Shoplist } from "src/shoplists/entities/shoplist.entity";
import { AddRecipeDto } from "./dto/add-recipe.dto";
import { AuthService } from "src/firestore/auth.service";

@Injectable()
export class ShoplistsService {
  constructor(
    private readonly shoplistDocument: ShoplistDocument,
    private authService: AuthService
  ) {}

  async create(createShoplistDto: CreateShoplistDto): Promise<Shoplist> {
    const userId = await this.authService.verifyTokenAndReturnUid(
      createShoplistDto.token
    );
    const shoplist = new Shoplist(
      userId,
      createShoplistDto.title,
      createShoplistDto.favorite,
      createShoplistDto.recipes
    );
    return this.shoplistDocument.create(shoplist);
  }

  addRecipe(addRecipeDto: AddRecipeDto): Promise<Shoplist> {
    return this.shoplistDocument.update();
  }

  findAll(token: string): Promise<Shoplist[]> {
    return this.shoplistDocument.findAll(token);
  }

  findOne(id: string): Promise<Shoplist> {
    return this.shoplistDocument.findOne(id);
  }

  // ? Estritamente necessário com limitação de tempo ?
  update(id: number, updateShoplistDto: UpdateShoplistDto) {
    return this.shoplistDocument.update();
  }

  remove(id: string) {
    this.shoplistDocument.delete(id);
    return `This action removes a #${id} shoplist`;
  }
}
