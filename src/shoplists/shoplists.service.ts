import { Injectable } from "@nestjs/common";
import { CreateShoplistDto } from "src/shoplists/dto/create-shoplist.dto";
import { UpdateShoplistDto } from "src/shoplists/dto/update-shoplist.dto";
import { ShoplistDocument } from "src/shoplists/documents/shoplist.document";
import { Shoplist } from "src/shoplists/entities/shoplist.entity";
import { AuthService } from "src/firebase/auth.service";
import { ResponseShoplistDto } from "./dto/response-shoplist.dto";

@Injectable()
export class ShoplistsService {
  constructor(
    private readonly shoplistDocument: ShoplistDocument,
    private authService: AuthService
  ) {}

  async create(createShoplistDto: CreateShoplistDto): Promise<ResponseShoplistDto> {
    const userId = await this.authService.verifyTokenAndReturnUid(createShoplistDto.token);
    const shoplist = new Shoplist(
      createShoplistDto.title,
      createShoplistDto.favorite,
      createShoplistDto.recipes,
      userId
    );
    return this.shoplistDocument.create(shoplist);
  }

  async favorite(recipeId: string) {
    return this.shoplistDocument.changeFavorite(recipeId, true);
  }

  async disfavor(recipeId: string) {
    return this.shoplistDocument.changeFavorite(recipeId, false);
  }


  async findAll(token: string): Promise<ResponseShoplistDto[]> {
    const shoplists = await this.shoplistDocument.findAll(token);
    const responseShoplistDtoList: ResponseShoplistDto[] = [];
    shoplists.forEach( shoplist => responseShoplistDtoList.push(new ResponseShoplistDto(shoplist)))
    return responseShoplistDtoList;
  }

  async findOne(id: string): Promise<ResponseShoplistDto> {
    const shoplist = await this.shoplistDocument.findOne(id)
    const responseShoplistDto = new ResponseShoplistDto(shoplist);
    return responseShoplistDto;
  }

  async updatePortion(id: string, updateShoplistDto: UpdateShoplistDto): Promise<ResponseShoplistDto> {
    return this.shoplistDocument.updatePortion(updateShoplistDto, id);
  }

  async remove(id: string) {
    this.shoplistDocument.delete(id);
    return `This action removes a #${id} shoplist`;
  }
}
