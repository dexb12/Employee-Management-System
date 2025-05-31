const mysql = require("mysql2");
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

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
