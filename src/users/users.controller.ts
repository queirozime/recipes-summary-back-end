import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  findAll() {
    return this.usersService.findAll();
  }
  
  @Get()
  findOne(@Request() req){
    const token = req.headers.authorization;
    return this.usersService.findOne(token);
  }

  @Delete()
  remove(@Request() req) {
    const token = req.headers.authorization;
    return this.usersService.remove(token);
  }

  /*@Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  return this.usersService.update(id, updateUserDto);
  }*/
  /*
  @Delete(':token')
  remove(@Param('token') token: string) {
    return this.usersService.remove(token);
  }*/
}

