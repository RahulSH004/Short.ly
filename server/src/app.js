require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const urlRoutes = require("./routes/urlroute");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();

// CORS configuration - only once
const corsOptions = {
  origin: ["http://localhost:5173","https://shortly-xi-lake.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/url", urlRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'URL Shortener API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});