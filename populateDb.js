/** @format */

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

const csvFilePath = path.join(__dirname, "db/MOCK_DATA.csv");

async function insertData(character) {
  const {id, first_name, last_name, email, gender, ip_address} = character;
  console.log(`Inserting: ${JSON.stringify(character)}`);
  try {
    const [result] = await pool.query(
      "INSERT INTO characters (id, first_name, last_name, email, gender, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
      [id, first_name, last_name, email, gender, ip_address]
    );
    console.log(`Inserted character ID: ${result.insertId}`);
  } catch (error) {
    console.error("Error inserting character:", error);
  }
}

async function main() {
  try {
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", data => {
        console.log("Parsed CSV row:", data);
        results.push(data);
      })
      .on("end", async () => {
        console.log(`Read ${results.length} records from CSV file.`);
        for (const character of results) {
          await insertData(character);
        }
        console.log("Data successfully inserted into the database.");
        await pool.end();
      });
  } catch (err) {
    console.error("Error inserting data:", err);
    await pool.end();
  }
}

main();
