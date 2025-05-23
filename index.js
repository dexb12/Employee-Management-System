require("dotenv").config();
const pool = require("./config/dbConnection");
const express = require("express");
const PORT = process.env.PORT || 8000;
const app = express();
const attendanceRoutes = require("./routes/attendanceRoutes");

// parse JSON middleware
app.use(express.json());

app.use("/attendance", attendanceRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port:", PORT);
});
