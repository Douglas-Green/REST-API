/** @format */

const mysql = require("mysql2/promise");
require("dotenv").config();

async function setupDatabase() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });

    console.log("Connected to the database.");

    console.log("Creating the characters table...");

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS characters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        gender VARCHAR(50),
        ip_address VARCHAR(50)
      );
    `;

    await connection.query(createTableQuery);
    console.log("Characters table created successfully.");

    await connection.end();
  } catch (error) {
    console.error("Error setting up the database:", error);
  }
}

setupDatabase();
