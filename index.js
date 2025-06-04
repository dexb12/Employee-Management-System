require("dotenv").config();
const pool = require("./config/dbConnection");
const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();

// Import Routes
const attendanceRoutes = require("./routes/attendanceRoutes");
const employeesRoutes = require("./routes/employeesRoutes");
const authRoutes = require("./routes/authRoutes");

// parse JSON middleware
app.use(express.json());

// Routes
app.use("/attendance", attendanceRoutes);
app.use("/employeesRoute", employeesRoutes);
app.use("/authentication", authRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
