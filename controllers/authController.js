// Import required modules
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  getEmployeeByEmail,
  createEmployee,
} = require("../queries/employeeQueries");

/**
 * Controller for handling user login.
 * Expects 'email' and 'password' in the request body.
 * If credentials are valid, returns a JWT token.
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate that both email and password are provided
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  try {
    // Fetch user from database by email
    const user = await getEmployeeByEmail(email);

    // If user not found, return unauthorized
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    // Compare provided password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);

    // If password does not match, return unauthorized
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    // Generate JWT token with user id and email, expires in 1 day
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    console.log("Generated TOKEN", token);

    // Respond with success message and token
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    // Handle errors and respond with 500 status
    res.status(500).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password, department, position, hired_date } = req.body;

  // Validate name, email and password if provided
  if (!name || !email || !password)
    return res
      .status(400)
      .json({ message: "Name, email, and password are required!" });

  try {
    // Checks if the email is already registered in the database.
    const existingUser = await getEmployeeByEmail(email);
    if (existingUser)
      return res.status(409).json({ message: "Email is already registered" });

    // Hashes the password for security.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creates a new employee in the database with the provided details.
    const newEmployee = await createEmployee({
      name,
      email,
      password: hashedPassword,
      department,
      position,
      hired_date,
    });

    // Responds with a success message and the new employee’s ID if registration is successful.
    res.status(201).json({ success: true, employeeId: newEmployee.insertId });
  } catch (error) {
    // Handles errors and sends a 500 error if something goes wrong.
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser, registerUser };

/*
✅ You're in a good spot to move forward with things like:
1. Registration
2. Middleware to protect routes (JWT verification)
3. Logout (if you go the token invalidation route)
*/
