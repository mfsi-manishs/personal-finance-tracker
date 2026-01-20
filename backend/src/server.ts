import "./env.js"; // First import environment variables

import app from "./app.js";
import { MongoDB } from "./config/db.config.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await MongoDB.connectDB();

  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });

  // Graceful shutdown
  const shutdown = async () => {
    console.log("Shutting down server...");
    await MongoDB.disconnectDB();
    server.close(() => {
      console.log("Server closed, DB disconnected");
      process.exit(0);
    });
  };
  process.on("SIGINT", shutdown); // Ctrl+C
  process.on("SIGTERM", shutdown); // kill command
};

startServer();
