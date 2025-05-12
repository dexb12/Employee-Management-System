const pool = require("../config/dbConnection");

const getAllAttendance = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM attendance");
    return rows;
  } catch (error) {
    console.error("Error executing query", error.message);
    throw new Error("Failed to fetch data from the database");
  }
};

const getAttendanceById = async (id) => {
  try {
    const [rows] = await pool.query(
      `
        SELECT * FROM attendance
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

const createAttendance = async (employee_id, check_in, check_out) => {
  try {
    const [result] = await pool.query(
      `
        INSERT INTO attendance (employee_id, check_in, check_out)
        VALUES (?, ?, ?)
      `,
      [employee_id, check_in, check_out]
    );
    return { success: true, attendanceId: result.insertId };
  } catch (error) {
    console.error("Error executing query:", error);
    return { success: false, error: error.message };
  }
};

const updateAttendance = async (id, check_in, check_out) => {
  try {
    const [result] = await pool.query(
      `
        UPDATE attendance
        SET check_in = ?, check_out = ?
        WHERE id = ?
      `,
      [check_in, check_out, id]
    );
    if (result.affectedRows === 0) {
      throw new Error(`No attendance found with id: ${id}`);
    }
    return { success: true, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("Error executing query:", error);
    return { success: false, error: error.message };
  }
};

const deleteAttendance = async (id) => {
  try {
    const [result] = await pool.query(
      `
        DELETE FROM attendance
        WHERE id = ?
      `,
      [id]
    );
    return { success: true, affectedRows: result.affectedRows };
  } catch (error) {
    console.error("Error executing query:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
