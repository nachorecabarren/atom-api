import { Request, Response } from "express";
import { UserService } from "../../../application/user.service";

export class UserController {
  constructor(private userService: UserService) {}

  async createUser(req: Request, res: Response) {
    try {
      console.log("Creating new user ");
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Missing user email" });
      }

      const user = await this.userService.createUser(email);

      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }

  async findUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Missing or invalid email" });
      }

      const user = await this.userService.findUserByEmail(email);

      return res.status(200).json({ user: user ?? null });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }
}
