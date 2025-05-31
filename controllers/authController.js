const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { getEmployeeByEmail } = require("../queries/employeeQueries");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  try {
    const user = await getEmployeeByEmail(email);
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET_TOKEN,
      {
        expiresIn: "1d",
      }
    );
    console.log("Generated TOKEN", token);

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { loginUser };

/*
✅ You're in a good spot to move forward with things like:
1. Registration
2. Middleware to protect routes (JWT verification)
3. Logout (if you go the token invalidation route)
*/
