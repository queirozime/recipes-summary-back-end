export class User {
  private uid: string;
  private name: string;
  private email: string;
  private password: string;

  constructor(name: string, email: string, uid: string) {
    this.name = name;
    this.email = email;
    this.uid = uid;
  }

  // Getters e Setters
  setUid(uid: string) {
    this.uid = uid;
  }

  getUid(): string {
    return this.uid;
  }
  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  setPassword(password: string) {
    this.password = password;
  }
}
