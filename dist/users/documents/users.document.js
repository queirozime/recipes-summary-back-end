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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var UserDocument_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDocument = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../entities/user.entity");
const firestore_1 = require("@google-cloud/firestore");
const admin = require("firebase-admin");
require('dotenv').config();
const credencials = JSON.parse(process.env.SB_KEY);
admin.initializeApp({
    credential: admin.credential.cert(credencials),
});
let UserDocument = UserDocument_1 = class UserDocument {
    constructor(userCollection) {
        this.userCollection = userCollection;
        this.userConverter = {
            toFirestore(user) {
                return {
                    name: user.getName(),
                    email: user.getEmail(),
                    uid: user.getUid(),
                };
            },
            fromFirestore(snapshot) {
                const data = snapshot.data();
                return new user_entity_1.User(data.name, data.email, data.uid);
            }
        };
    }
    async create(user) {
        const snapshot = await this.userCollection.withConverter(this.userConverter).add(user);
        user.setUid(snapshot.id);
        return user;
    }
    async findAll() {
        const snapshot = await this.userCollection.withConverter(this.userConverter).get();
        const users = [];
        snapshot.forEach(doc => {
            let user = doc.data();
            user.setUid(doc.id);
            users.push(user);
        });
        return users;
    }
    async findDocument(token) {
        try {
            const decodedToken = await admin.auth().verifyIdToken(token);
            const uid = decodedToken.uid;
            const query = this.userCollection.withConverter(this.userConverter).where('uid', '==', uid);
            const snapshot = await query.get();
            if (snapshot.empty) {
                console.log('Nenhum usuário encontrado com esse UID.');
                return null;
            }
            let document = null;
            snapshot.forEach(doc => {
                document = doc;
            });
            return document;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }
    async findOne(token) {
        const doc = await this.findDocument(token);
        const user = doc.data();
        console.log('Usuário encontrado:', doc.id, user);
        return user;
    }
    async delete(token) {
        const doc = (await this.findDocument(token));
        await this.userCollection.withConverter(this.userConverter).doc('/' + doc.id).delete();
        return `The user #${doc.data().getUid()} was removed successfully`;
    }
};
UserDocument.collectionName = 'users';
UserDocument = UserDocument_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.REQUEST }),
    __param(0, (0, common_1.Inject)(UserDocument_1.collectionName)),
    __metadata("design:paramtypes", [firestore_1.CollectionReference])
], UserDocument);
exports.UserDocument = UserDocument;
//# sourceMappingURL=users.document.js.map