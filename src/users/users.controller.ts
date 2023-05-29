import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateShoplistDto } from 'src/shoplists/dto/create-shoplist.dto';
import { UpdateShoplistDto } from 'src/shoplists/dto/update-shoplist.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('shoplists/create')
  create(@Body() createShoplistDto: CreateShoplistDto) {
    return this.usersService.create(createShoplistDto);
  }

  @Get('shoplists')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('shoplists/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('shoplists/:id')
  update(@Param('id') id: string, @Body() updateShoplistDto: UpdateShoplistDto) {
    return this.usersService.update(+id, updateShoplistDto);
  }

  @Delete('shoplists/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
