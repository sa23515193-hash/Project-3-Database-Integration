require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const itemRoutes = require("./routes/itemRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors());

// Limit repeated requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests. Please try again later." }
  })
);

// Body parser
app.use(express.json({ limit: "10kb" }));

// Frontend dashboard
// Express serves the complete frontend from the public folder.
app.use(express.static("public"));

// API health route
app.get("/api", (req, res) => {
  res.json({
    success: true,
    message: "Project 3 Database Integration API is running.",
    endpoints: {
      items: "/api/items",
      health: "/api/health"
    }
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    database: "MongoDB",
    status: "API is healthy"
  });
});

// API routes
app.use("/api/items", itemRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exit(1);
  }
}

startServer();