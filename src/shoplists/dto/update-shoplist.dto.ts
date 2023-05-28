import { PartialType } from '@nestjs/mapped-types';
import { CreateShoplistDto } from './create-shoplist.dto';

export class UpdateShoplistDto extends PartialType(CreateShoplistDto) {}
