export class User {
  id: number;
  name: string;
  email: string;
  password: string;

  constructor(
    id: number,
    name: string,
    email: string,
    password: string,
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.id = id;
  }
}
