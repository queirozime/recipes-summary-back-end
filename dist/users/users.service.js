"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_document_1 = require("./documents/users.document");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userDocument) {
        this.userDocument = userDocument;
    }
    async create(createUserDto) {
        const user = new user_entity_1.User(createUserDto.name, createUserDto.email, createUserDto.password);
        return this.userDocument.create(user);
    }
    async findAll() {
        return this.userDocument.findAll();
    }
    async findOne(id) {
        return this.userDocument.findOne(id);
    }
    remove(id) {
        this.userDocument.delete(id);
        return `The user #${id} was removed successfully`;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_document_1.UserDocument])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map