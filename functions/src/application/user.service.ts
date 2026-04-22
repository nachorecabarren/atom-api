import { IUserRepository } from "../domain/repositories/user.repository";
import { UserFactory } from "../domain/factories/user.factory";
import { User } from "../domain/entities/user.entity";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async createUser(
    email: string
  ): Promise<User> {
    const user = UserFactory.create(email);
    await this.userRepository.create(user);
    return user;
  }
}
