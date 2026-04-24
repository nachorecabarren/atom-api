import { Request, Response } from "express";
import { UserService } from "../../../application/user.service";
import { generateToken } from "../../utils/auth.helper";

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
      const token = generateToken(user.id, user.email);
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(201).json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ message });
    }
  }

  async findUserByEmail(req: Request, res: Response) {
    try {
      const { email } = req.params;

      if (!email || typeof email !== "string") {
        return res.status(400).json({ message: "Missing or invalid email" });
      }

      const user = await this.userService.findUserByEmail(email);
      if (user) {
        const token = generateToken(user.id, user.email);
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "strict",
          maxAge: 24 * 60 * 60 * 1000,
        });
      }

      return res.status(200).json({ user: user ?? null });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server error";
      return res.status(500).json({ message });
    }
  }

  async logout(req: Request, res: Response) {
    res.clearCookie("auth_token");
    return res.status(200).json({ message: "Logged out" });
  }
}
