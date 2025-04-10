require("dotenv").config();

const pool = require("../config/dbConnection");

const insertUserQuery = `
    INSERT INTO users (name, email, address) VALUES ?
`;

const userData = [
  ["John Doe", "john@gmail.com", "Tambulig"],
  ["Bob Johnson", "bob@example.com", "Washington"],
  ["Rodrigo", "rod@yahoo.com", "Davao City"],
];

pool.query(insertUserQuery, userData, (err, result) => {
  if (err) {
    console.error("Error inserting user:", err.message);
    return;
  }
  console.log("User inserted successfully!", result.insertId);
});
