const pool = require("../config/dbConnection");

const createEmployeesTable = `
    CREATE TABLE IF NOT EXISTS employees (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        department VARCHAR(100),
        position VARCHAR(100),
        hired_date DATE DEFAULT (CURRENT_DATE),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

const createAttendanceTable = `
    CREATE TABLE IF NOT EXISTS attendance (
        id INT PRIMARY KEY AUTO_INCREMENT,
        employee_id INT NOT NULL,
        check_in TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        check_out TIMESTAMP,
        FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
    );
`;

async function initTables() {
  try {
    await pool.query(createEmployeesTable);
    console.log("Employees table successfully created");
    await pool.query(createAttendanceTable);
    console.log("Attendance table successfully created");
  } catch (error) {
    console.log("Error creating table", error);
  }
}

initTables();
