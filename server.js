/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// GET endpoint to retrieve all characters
app.get("/characters", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM characters");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching characters:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Catch-all route for 404
app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
