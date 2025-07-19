import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";
import { AuthenticatedRequest } from "../middleware/authMiddleware";

export async function register(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    await registerUser(username, password);
    res.status(201).json({ message: "User registered successfully." });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}

export async function login(req: Request, res: Response) {
  const { username, password } = req.body;
  try {
    const token = await loginUser(username, password);
    res.status(200).json({ token });
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}

export function profile(req: AuthenticatedRequest, res: Response) {
  res.status(200).json({ message: `Welcome ${req.user.username}` });
}
