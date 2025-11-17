require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRoutes = require("./Routes/books.routes"); // routes file
const authRoutes = require("./Routes/authRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const app = express();
const PORT = 5300;

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect("mongodb://localhost:27017/product", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("open", () => console.log("✅ MongoDB connected"));
db.on("error", () => console.log("❌ MongoDB connection failed"));

// ✅ Routes (must be mounted after express.json())
app.use("/api", productRoutes);
app.use("/api", authRoutes);
app.use("/api", cartRoutes);

// ✅ Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
