const pool = require("../config/dbConnection");

const getAllEmployee = async () => {
  const [rows] = await pool.query(`SELECT * FROM employees`);
  return rows;
};

const getEmployeeById = async (id) => {
  try {
    const [rows] = await pool.query(
      `
        SELECT *  FROM employees
        WHERE id = ?      
    `,
      [id]
    );
    return rows[0];
  } catch (error) {
    console.error("Error executing query:", error);
    throw new Error("Failed to fetch data from the database.");
  }
};

const createEmployee = async (
  name,
  email,
  password,
  department,
  position,
  hired_date
) => {
  try {
    const [result] = await pool.query(
      `
        INSERT INTO employees (name, email, password, department, position, hired_date)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [name, email, password, department, position, hired_date]
    );
    return { success: true, employeeId: result.insertId };
  } catch (error) {
    console.error("Error executing query:", error);
    return { success: false, error: error.message };
  }
};

const updateEmployee = async (
  id,
  name,
  email,
  password,
  department,
  position,
  hired_date
) => {
  try {
    const [result] = await pool.query(
      `
        UPDATE employees
        SET name = ?, email = ?, password = ?, department = ?, position = ?, hired_date = ?
        WHERE id = ?
      `,
      [id, name, email, password, department, position, hired_date]
    );
    return { success: true };
  } catch (error) {
    console.error("Error executing query:", error);
    return { success: false, error: error.message };
  }
};

const deleteEmployee = async (id) => {
  try {
    const [result] = await pool.query(
      `
        DELETE FROM employees
        WHERE id = ?
      `,
      [id]
    );
    return { success: true };
  } catch (error) {
    console.error("Error executing query", error);
    return { success: false, Error: error.message };
  }
};

module.exports = {
  getAllEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
