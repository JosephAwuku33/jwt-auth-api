import app from "./app";
import dotenv from "dotenv";
dotenv.config();
import { config } from "./config/config";

const PORT = config.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Optional: Add graceful shutdown logic for production
process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down server...");
  server.close(() => {
    console.log("Server gracefully shut down.");
    process.exit(0);
  });
});
