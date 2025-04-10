require("dotenv").config();
const pool = require("../config/dbConnection");

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   
    )
`;

console.log("Database name in createTable.js:", process.env.DATABASE_NAME);
console.log("DB_Password in createTable.js:", process.env.MYSQL_PASSWORD);

pool.query(createTableQuery, (err, result) => {
  if (err) {
    console.error("Error creating table:", err.message);
    return;
  }
  console.log("Users table created successfully!");
});
