import { readUsers, writeUsers } from "../utils/fileStorage";
import { User } from "../types/User";

export class UserModel {
  static findByUsername(username: string): User | undefined {
    return readUsers().find((u) => u.username === username);
  }

  static create(user: User): void {
    const users = readUsers();
    users.push(user);
    writeUsers(users);
  }
}
