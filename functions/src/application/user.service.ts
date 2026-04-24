import { IUserRepository } from "../domain/repositories/user.repository";
import { UserFactory } from "../domain/factories/user.factory";
import { User } from "../domain/entities/user.entity";

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.userRepository.findByEmail(email);
    } catch (error) {
      console.error("Error finding user by email:", error);
      throw new Error("Could not find user");
    }
  }

  async createUser(
    email: string
  ): Promise<User> {
    try {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error("User already exists");
      }
      const user = UserFactory.create(email);
      return await this.userRepository.create(user);
    } catch (error) {
      console.error("Error creating user:", error);
      throw error instanceof Error ? error : new Error("Could not create user");
    }
  }
}
