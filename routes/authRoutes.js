const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const { getEmployeeByEmail } = require("../queries/employeeQueries");

router.post("/login", loginUser);

module.exports = router;
