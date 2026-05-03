import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Create connection pool instead of single connection for better performance and reliability
let pool: mysql.Pool | null = null;

function getDbPool() {
  if (!pool) {
    if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_DATABASE) {
      console.warn("MySQL configuration is missing. Please set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE.");
      return null;
    }
    
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE,
      port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routing
  app.get("/api/db-status", async (req, res) => {
    try {
      const dbPool = getDbPool();
      if (!dbPool) {
        return res.status(500).json({ status: "error", message: "Database not configured" });
      }
      
      // Test the connection
      await dbPool.query("SELECT 1 as val");
      res.json({ status: "ok", message: "Successfully connected to MySQL database!" });
    } catch (error) {
      console.error("Database connection error:", error);
      res.status(500).json({ 
        status: "error", 
        message: "Failed to connect to database", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Note: If using ESM, __dirname is not defined, but we are building server to CJS using esbuild, so __dirname will work
    const distPath = path.join(__dirname, '../dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
