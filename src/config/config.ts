import path from "path";

export const config = {
  SECRET_KEY: process.env.SECRET_KEY || "excellencyinprogramming",
  TOKEN_EXPIRATION: 60 * 60 * 15,
  USER_FILE_PATH: path.resolve(__dirname, "..", "users.json"),
  PORT: parseInt(process.env.PORT || '3000', 10),
};
