require("dotenv").config();
const pool = require("./config/dbConnection");
const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();

// parse JSON middleware
app.use(express.json());

// GET ALL USERS

// GET A SINGLE USER

// QUERY the database

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
