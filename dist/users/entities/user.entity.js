"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name, email, uid) {
        this.name = name;
        this.email = email;
        this.uid = uid;
    }
    setUid(uid) {
        this.uid = uid;
    }
    getUid() {
        return this.uid;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    setPassword(password) {
        this.password = password;
    }
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map