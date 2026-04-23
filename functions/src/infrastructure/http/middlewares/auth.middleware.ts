import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../../utils/auth.helper";

export interface AuthRequest extends Request {
  user?: { userId: string; email: string };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
): void => {
  const token = req.cookies?.auth_token;

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const decoded = verifyToken(token) as { userId: string; email: string };
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
