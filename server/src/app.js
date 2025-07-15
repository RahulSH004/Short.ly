require("dotenv").config();
const express = require("express");
const connectDB  = require("./db");
const urlRoutes = require("./routes/urlroute");
const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.use("/url", urlRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'URL Shortener API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});