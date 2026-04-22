import { User } from "../entities/user.entity";
import { v4 as uuidv4 } from "uuid";

export class UserFactory {
  static create(email: string) {
    return new User(uuidv4(), email, new Date());
  }
}
