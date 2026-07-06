const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
console.log("=== THIS IS MY SERVER.JS ===");
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("TaskFlow API Running... Version 2");
});
app.post("/test", (req, res) => {
  res.json({
    message: "POST route is working!"
  });
});
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
  } catch (error) {
    console.warn("Starting server without a database connection.");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  import cors from "cors";

app.use(cors({
  origin: "https://task-flow-ruby-nu.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
};

startServer();