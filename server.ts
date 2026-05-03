import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

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

    // Initialize tables
    initializeDb().catch(console.error);
  }
  return pool;
}

async function initializeDb() {
  const p = getDbPool();
  if (!p) return;

  try {
    console.log("Initializing database tables...");
    await p.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255) NOT NULL,
        avatar TEXT,
        balance DECIMAL(10, 2) DEFAULT 0.00,
        totalEarnings DECIMAL(10, 2) DEFAULT 0.00,
        isPrivate BOOLEAN DEFAULT FALSE,
        isAdmin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Ensure email column exists (migration for existing tables)
    try {
      await p.query("ALTER TABLE users ADD COLUMN email VARCHAR(255) UNIQUE AFTER username");
    } catch (e) {
      // Ignore if column already exists
    }

    await p.query(`
      CREATE TABLE IF NOT EXISTS activities (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        coins DECIMAL(10, 2) NOT NULL,
        type VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        time VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS chat_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sender VARCHAR(255) NOT NULL,
        avatar TEXT,
        text TEXT NOT NULL,
        time VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("Database tables initialized successfully.");
  } catch (err) {
    console.error("Error initializing database:", err);
  }
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

  // Authentication Endpoints
  app.post("/api/auth/register", async (req, res) => {
    const { username, email, password, avatar } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    try {
      const dbPool = getDbPool();
      if (!dbPool) throw new Error("DB not configured");

      // Check if user already exists
      const [existing]: any = await dbPool.query("SELECT id FROM users WHERE username = ? OR (email IS NOT NULL AND email = ?)", [username, email || null]);
      if (existing.length > 0) {
        return res.status(400).json({ error: "Username or email already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const [result]: any = await dbPool.query(
        "INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)",
        [username, email || null, hashedPassword, avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`]
      );

      const [newUser]: any = await dbPool.query("SELECT id, username, email, avatar, balance, totalEarnings, isPrivate, isAdmin FROM users WHERE id = ?", [result.insertId]);
      res.status(201).json({ user: newUser[0] });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Failed to register user" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }

    try {
      const dbPool = getDbPool();
      if (!dbPool) throw new Error("DB not configured");

      const [rows]: any = await dbPool.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username]);
      
      if (rows.length === 0) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      const user = rows[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid username or password" });
      }

      // Don't send password back to client
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Failed to login" });
    }
  });

  app.get("/api/user/:id", async (req, res) => {
    try {
      const dbPool = getDbPool();
      if (!dbPool) throw new Error("DB not configured");

      const [users]: any = await dbPool.query("SELECT id, username, email, avatar, balance, totalEarnings, isPrivate, isAdmin FROM users WHERE id = ?", [req.params.id]);
      if (users.length === 0) return res.status(404).json({ error: "User not found" });

      const [activities]: any = await dbPool.query("SELECT * FROM activities WHERE user_id = ? ORDER BY created_at DESC", [req.params.id]);
      
      const userData = {
        ...users[0],
        activities: activities
      };
      res.json(userData);
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.put("/api/user/:id/profile", async (req, res) => {
    const { username, avatar } = req.body;
    try {
      const dbPool = getDbPool();
      if (!dbPool) throw new Error("DB not configured");

      await dbPool.query("UPDATE users SET username = ?, avatar = ? WHERE id = ?", [username, avatar, req.params.id]);
      
      const [users]: any = await dbPool.query("SELECT id, username, email, avatar, balance, totalEarnings, isPrivate, isAdmin FROM users WHERE id = ?", [req.params.id]);
      res.json({ user: users[0] });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post("/api/activity", async (req, res) => {
    const { user_id, name, coins, type, status, time } = req.body;
    try {
      const dbPool = getDbPool();
      if (!dbPool) throw new Error("DB not configured");

      await dbPool.query(
        "INSERT INTO activities (user_id, name, coins, type, status, time) VALUES (?, ?, ?, ?, ?, ?)",
        [user_id, name, coins, type, status, time]
      );
      
      // Update user balance
      if (status === "Completed" || coins < 0) {
        await dbPool.query(
          "UPDATE users SET balance = balance + ?, totalEarnings = totalEarnings + ? WHERE id = ?",
          [coins, coins > 0 ? coins : 0, user_id]
        );
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.get("/api/chat", async (req, res) => {
    try {
      const dbPool = getDbPool();
      if (!dbPool) throw new Error("DB not configured");

      const [rows]: any = await dbPool.query("SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT 50");
      res.json(rows.reverse());
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  app.post("/api/chat", async (req, res) => {
    const { sender, avatar, text, time } = req.body;
    try {
      const dbPool = getDbPool();
      if (!dbPool) throw new Error("DB not configured");

      await dbPool.query(
        "INSERT INTO chat_messages (sender, avatar, text, time) VALUES (?, ?, ?, ?)",
        [sender, avatar, text, time]
      );
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: String(error) });
    }
  });

  // API 404 fallback - Handle all unmatched /api/* routes
  app.all("/api/*", (req, res) => {
    console.warn(`Unmatched API request: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
      error: "API endpoint not found",
      method: req.method,
      path: req.originalUrl 
    });
  });

  // Health check for debugging
  app.get("/api/health", async (req, res) => {
    const distPath = path.resolve(__dirname, "..", "dist");
    let distFiles: string[] = [];
    try {
      const fs = await import("fs/promises");
      distFiles = await fs.readdir(distPath).catch(() => []);
    } catch (e) {}

    res.json({ 
      status: "ok", 
      time: new Date().toISOString(),
      env: process.env.NODE_ENV,
      dbConfigured: !!(process.env.MYSQL_HOST && process.env.MYSQL_DATABASE),
      cwd: process.cwd(),
      dirname: __dirname,
      distPath,
      distFiles
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built files
    // Use __dirname as it is more reliable for bundled scripts in a subdirectory
    const distPath = path.resolve(__dirname, "..", "dist");
    
    // Log for debugging
    console.log(`[Production] Current dir: ${__dirname}`);
    console.log(`[Production] Attempting to serve static files from: ${distPath}`);
    
    // Check if dist/index.html exists
    import("fs").then(fs => {
      if (fs.existsSync(path.join(distPath, "index.html"))) {
        console.log("[Production] index.html found in dist.");
      } else {
        console.error("[Production] index.html NOT found in dist!");
        // Look in current directory as fallback
        const altDistPath = path.resolve(process.cwd(), "dist");
        console.log(`[Production] Trying fallback dist path: ${altDistPath}`);
        if (fs.existsSync(path.join(altDistPath, "index.html"))) {
          console.log("[Production] index.html found in fallback dist.");
        }
      }
    });
    
    app.use(express.static(distPath));
    
    // Catch-all route to serve index.html for SPA
    app.get("*", (req, res) => {
      // If we reach here, it's a GET request that didn't match any static file or API route
      // Serve the SPA index.html
      const indexPath = path.join(distPath, "index.html");
      
      res.sendFile(indexPath, (err) => {
        if (err) {
          console.error("Error sending index.html:", err);
          res.status(500).send("<h1>Server Error</h1><p>Failed to load the application. Please try again later.</p>");
        }
      });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(console.error);
