import { Controller, Get, Post, Body, Delete, Request } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Request() req) {
    const token = req.headers.authorization;
    return this.usersService.create(createUserDto, token);
  }

  @Get("all")
  findAll() {
    return this.usersService.findAll();
  }

  @Get()
  findOne(@Request() req) {
    const token = req.headers.authorization;
    return this.usersService.findOne(token);
  }

  @Delete()
  remove(@Request() req) {
    const token = req.headers.authorization;
    return this.usersService.remove(token);
  }
}
