const bcrypt = require("bcrypt");
const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../queries/employeeQueries");

const fetchAllEmployees = async (req, res) => {
  try {
    const data = await getAllEmployees();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const fetchEmployeeById = async (req, res) => {
  try {
    const data = await getEmployeeById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching employee id:", error);
    res.status(500).json({ error: error.message });
  }
};

const registerEmployee = async (req, res) => {
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await createEmployee(
      name,
      email,
      hashedPassword,
      department,
      position,
      hired_date
    );
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating employee", error);
    res.status(500).json({ error: error.message });
  }
};

const modifyEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, password, department, position, hired_date } =
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

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await updateEmployee(
      id,
      name,
      email,
      hashedPassword,
      department,
      position,
      hired_date
    );

    res.status(200).json(result);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
};

const removeEmployee = async (req, res) => {
  try {
    const result = await deleteEmployee(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchAllEmployees,
  fetchEmployeeById,
  registerEmployee,
  modifyEmployee,
  removeEmployee,
};
