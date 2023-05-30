
export class User {
  private id: string;
  private name: string;
  private email: string;
  private password: string;

  constructor(
    name: string, email: string, password: string
  ) {
    this.name = name;
    this.email = email;
    this.password = password;

  }

  // Getters e Setters
  setId(id: string) {
    this.id = id;
  }

  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
}
