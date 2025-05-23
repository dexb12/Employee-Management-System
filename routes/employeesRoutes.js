const express = require("express");
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
} = require("../queries/employeeQueries");
const router = express.Router();

// GET All Employees
router.get("/", async (req, res) => {
  try {
    const data = await getAllEmployees();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await getEmployeeById();

    if (!data) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching employee id:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST Create Employee
router.post("/", async (req, res) => {
  try {
    const { name, email, password, department, position, hired_date } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      !department ||
      !position ||
      !hired_date
    ) {
      return res.status(400).json({ message: "Incomplete details" });
    }

    const result = await createEmployee(
      name,
      email,
      password,
      department,
      position,
      hired_date
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating employee", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT Update Employee Record
router.put("/", async (req, res) => {
  try {
    const { id, name, email, password, department, position, hired_date } =
      req.body;

    if (
      !id ||
      !name ||
      !email ||
      !password ||
      !department ||
      !position ||
      !hired_date
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await updateEmployee(
      id,
      name,
      email,
      password,
      department,
      position,
      hired_date
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
});
