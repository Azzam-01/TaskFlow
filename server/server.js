const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

console.log("=== TASKFLOW SERVER STARTING ===");

dotenv.config();

const app = express();

/* =========================
   CORS CONFIG (FIXED)
========================= */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-flow-ruby-nu.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

/* =========================
   TEST ROUTES
========================= */
app.get("/", (req, res) => {
  res.send("TaskFlow API Running...");
});

app.post("/test", (req, res) => {
  res.json({
    message: "POST route is working!"
  });
});

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected");
  } catch (error) {
    console.warn("MongoDB connection failed, server still starting...");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();