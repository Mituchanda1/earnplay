import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import cors from "cors";

dotenv.config();

// Lazy database initialization
let pool: mysql.Pool | null = null;
let isDbInitializing = false;

async function getDbPool() {
  if (pool) return pool;
  
  if (!process.env.MYSQL_HOST || !process.env.MYSQL_USER || !process.env.MYSQL_DATABASE) {
    console.warn("MySQL configuration is missing. API calls requiring DB will fail.");
    return null;
  }
  
  try {
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

    // Fire and forget initialization if not already doing it
    if (!isDbInitializing) {
      isDbInitializing = true;
      initializeDbOnce().catch(err => {
        console.error("Database initialization failed:", err);
        isDbInitializing = false;
      });
    }
    
    return pool;
  } catch (err) {
    console.error("Failed to create database pool:", err);
    return null;
  }
}

async function initializeDbOnce() {
  const p = pool;
  if (!p) return;

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
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Request logger
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} [${res.statusCode}] - ${duration}ms - Host: ${req.get('host')}`);
    });
    next();
  });

  // API routing
  const apiRouter = express.Router();

  apiRouter.get("/db-status", async (req, res) => {
    try {
      const dbPool = await getDbPool();
      if (!dbPool) return res.status(500).json({ status: "error", message: "Database not configured" });
      await dbPool.query("SELECT 1 as val");
      res.json({ status: "ok", message: "Successfully connected to MySQL database!" });
    } catch (error) {
      res.status(500).json({ status: "error", error: String(error) });
    }
  });

  apiRouter.post("/auth/register", async (req, res) => {
    const { username, email, password, avatar } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password are required" });
    try {
      const dbPool = await getDbPool();
      if (!dbPool) return res.status(500).json({ error: "Database not configured" });
      const [existing]: any = await dbPool.query("SELECT id FROM users WHERE username = ? OR (email IS NOT NULL AND email = ?)", [username, email || null]);
      if (existing.length > 0) return res.status(400).json({ error: "Username or email already exists" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result]: any = await dbPool.query("INSERT INTO users (username, email, password, avatar) VALUES (?, ?, ?, ?)", [username, email || null, hashedPassword, avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`]);
      const [newUser]: any = await dbPool.query("SELECT id, username, email, avatar, balance, totalEarnings, isPrivate, isAdmin FROM users WHERE id = ?", [result.insertId]);
      res.status(201).json({ user: newUser[0] });
    } catch (e) { res.status(500).json({ error: String(e) }); }
  });

  apiRouter.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "Username and password are required" });
    try {
      const dbPool = await getDbPool();
      if (!dbPool) return res.status(500).json({ error: "Database not configured" });
      const [rows]: any = await dbPool.query("SELECT * FROM users WHERE username = ? OR email = ?", [username, username]);
      if (rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });
      const user = rows[0];
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ error: "Invalid credentials" });
      const { password: _, ...safeUser } = user;
      res.json({ user: safeUser });
    } catch (e) { res.status(500).json({ error: String(e) }); }
  });

  apiRouter.get("/user/:id", async (req, res) => {
    try {
      const dbPool = await getDbPool();
      if (!dbPool) return res.status(500).json({ error: "DB not configured" });
      const [users]: any = await dbPool.query("SELECT id, username, email, avatar, balance, totalEarnings, isPrivate, isAdmin FROM users WHERE id = ?", [req.params.id]);
      if (users.length === 0) return res.status(404).json({ error: "User not found" });
      const [activities]: any = await dbPool.query("SELECT * FROM activities WHERE user_id = ? ORDER BY created_at DESC", [req.params.id]);
      res.json({ ...users[0], activities });
    } catch (e) { res.status(500).json({ error: String(e) }); }
  });

  apiRouter.put("/user/:id/profile", async (req, res) => {
    const { username, avatar } = req.body;
    try {
      const dbPool = await getDbPool();
      if (!dbPool) throw new Error("DB not configured");
      await dbPool.query("UPDATE users SET username = ?, avatar = ? WHERE id = ?", [username, avatar, req.params.id]);
      const [users]: any = await dbPool.query("SELECT id, username, email, avatar, balance, totalEarnings, isPrivate, isAdmin FROM users WHERE id = ?", [req.params.id]);
      res.json({ user: users[0] });
    } catch (error) { res.status(500).json({ error: String(error) }); }
  });

  apiRouter.post("/activity", async (req, res) => {
    const { user_id, name, coins, type, status, time } = req.body;
    try {
      const dbPool = await getDbPool();
      if (!dbPool) throw new Error("DB not configured");
      await dbPool.query("INSERT INTO activities (user_id, name, coins, type, status, time) VALUES (?, ?, ?, ?, ?, ?)", [user_id, name, coins, type, status, time]);
      if (status === "Completed" || coins < 0) {
        await dbPool.query("UPDATE users SET balance = balance + ?, totalEarnings = totalEarnings + ? WHERE id = ?", [coins, coins > 0 ? coins : 0, user_id]);
      }
      res.json({ success: true });
    } catch (error) { res.status(500).json({ error: String(error) }); }
  });

  apiRouter.get("/chat", async (req, res) => {
    try {
      const dbPool = await getDbPool();
      if (!dbPool) throw new Error("DB not configured");
      const [rows]: any = await dbPool.query("SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT 50");
      res.json(rows.reverse());
    } catch (error) { res.status(500).json({ error: String(error) }); }
  });

  apiRouter.post("/chat", async (req, res) => {
    const { sender, avatar, text, time } = req.body;
    try {
      const dbPool = await getDbPool();
      if (!dbPool) throw new Error("DB not configured");
      await dbPool.query("INSERT INTO chat_messages (sender, avatar, text, time) VALUES (?, ?, ?, ?)", [sender, avatar, text, time]);
      res.json({ success: true });
    } catch (error) { res.status(500).json({ error: String(error) }); }
  });

  // Use the router
  app.use("/api", apiRouter);

  // Health check for debugging (Moved outside router for absolute paths)
  app.get("/healthz", (req, res) => {
    res.status(200).send("OK Server Running - Port 3000");
  });

  // Diagnostic endpoint
  app.get("/diagnostic", async (req, res) => {
    const distPath = path.resolve(process.cwd(), "dist");
    let distExists = false;
    let distFiles: string[] = [];
    try {
      const fs = await import("fs/promises");
      distExists = (await fs.stat(path.join(distPath, "index.html")).catch(() => null)) !== null;
      distFiles = await fs.readdir(distPath).catch(() => []);
    } catch (e) {}

    res.json({
      message: "Server is alive and reachable",
      env: process.env.NODE_ENV,
      time: new Date().toISOString(),
      headers: req.headers,
      cwd: process.cwd(),
      distPath,
      distExists,
      distFiles,
      dbStatus: pool ? "Pool active" : "Pool not created"
    });
  });

  // API 404 handler - MUST return JSON
  app.use("/api", (req, res) => {
    console.warn(`[API 404] ${req.method} ${req.originalUrl}`);
    res.status(404).json({ 
      error: `API endpoint not found: ${req.method} ${req.originalUrl}`,
      tip: "Ensure you are calling the correct path (e.g., /api/auth/login)"
    });
  });

  // Static serving selection
  const distPath = path.resolve(process.cwd(), "dist");
  let isProduction = false;
  try {
    const fs = await import("fs");
    isProduction = fs.existsSync(path.join(distPath, "index.html"));
  } catch (e) {}

  if (isProduction || process.env.NODE_ENV === "production") {
    console.log(`[Server] Serving production assets from ${distPath}`);
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    console.log("[Server] Starting Vite in middleware mode");
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: "spa" });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
