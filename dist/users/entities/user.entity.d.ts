export declare class User {
    private uid;
    private name;
    private email;
    private password;
    constructor(name: string, email: string, uid: string);
    setUid(uid: string): void;
    getUid(): string;
    getName(): string;
    getEmail(): string;
    setPassword(password: string): void;
}
