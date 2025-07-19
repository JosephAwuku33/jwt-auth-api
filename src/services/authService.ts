import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { config } from "../config/config";

export async function registerUser(
  username: string,
  password: string
): Promise<void> {
  if (UserModel.findByUsername(username))
    throw new Error("User already exists");
  const hashedPassword = await bcrypt.hash(password, 10);
  UserModel.create({ username, password: hashedPassword });
}

export async function loginUser(
  username: string,
  password: string
): Promise<string> {
  const user = UserModel.findByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ username }, config.SECRET_KEY as string, {
    expiresIn: config.TOKEN_EXPIRATION,
  });

  return token;
}
