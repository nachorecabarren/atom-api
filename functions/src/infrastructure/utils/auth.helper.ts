import * as jwt from "jsonwebtoken";

const SECRET = "atom_challenge_secret_local";

export const generateToken = (userId: string, email: string): string => {
  return jwt.sign({ userId, email }, SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET);
};
