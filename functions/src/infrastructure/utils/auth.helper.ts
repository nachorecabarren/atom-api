import * as jwt from "jsonwebtoken";

const SECRET = "atom_challenge_secret_local";

export const generateToken = (userId: string, email: string): string => {
  try {
    return jwt.sign({ userId, email }, SECRET, { expiresIn: "24h" });
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Could not generate authentication token");
  }
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Invalid or expired token");
  }
};
