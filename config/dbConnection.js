const mysql = require("mysql2");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

console.log("Database Name: ", process.env.DATABASE_NAME);
console.log("DB_Password: ", process.env.MYSQL_PASSWORD);

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    database: process.env.DATABASE_NAME,
    password: process.env.MYSQL_PASSWORD,
  })
  .promise();

pool.getConnection((err) => {
  if (err) throw err;
  console.log("MySQL Database Connected!");
});

module.exports = pool;
