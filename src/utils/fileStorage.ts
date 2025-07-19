import fs from "fs";
import { config } from "../config/config";
import { User } from "../types/User";

export function readUsers(): User[] {
  if (!fs.existsSync(config.USER_FILE_PATH)) {
    fs.writeFileSync(config.USER_FILE_PATH, "[]", "utf-8");
    return [];
  }

  try {
    const data = fs.readFileSync(config.USER_FILE_PATH, "utf-8");
    if (data.trim() === "") {
      return [];
    }
    return JSON.parse(data) as User[];
  } catch (error) {
    console.error("Error reading or parsing user data file:", error);
    return [];
  }
}

export function writeUsers(users: User[]): void {
  fs.writeFileSync(config.USER_FILE_PATH, JSON.stringify(users, null, 2));
}
