export declare class User {
    private id;
    private name;
    private email;
    private password;
    constructor(name: string, email: string, password: string);
    setId(id: string): void;
    getId(): string;
    getName(): string;
    getEmail(): string;
    getPassword(): string;
}
