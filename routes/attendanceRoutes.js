const express = require("express");
const router = express.Router();

const {
  getAllAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../queries/attendanceQueries");

// GET all attendance records
router.get("/", async (req, res) => {
  try {
    const data = await getAllAttendance();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET attendance by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await getAttendanceById(req.params.id);

    if (!data) {
      return res.status(404).json({ message: "Records not found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error fetching attendance by ID:", error);
    res.status(500).json({ error: error.message });
  }
});

// POST Create attendance
router.post("/", async (req, res) => {
  try {
    const { employee_id, check_in, check_out } = req.body;

    if (!employee_id || !check_in || !check_out) {
      return res.status(400).json({ message: "Incomplete details" });
    }
    const result = await createAttendance(employee_id, check_in, check_out);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating attendance", error);
    res.status(500).json({ error: error.message });
  }
});

// PUT  Update Attendance Record
router.put("/:id", async (req, res) => {
  try {
    const { employee_id, check_in, check_out } = req.body;
    const result = await updateAttendance(req.params.id, check_in, check_out);

    if (!employee_id || !check_in || check_out) {
      throw new Error("Fields are mandatory");
    }
    res.status(200).json(result);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE Remove attendance record
router.delete("/:id", async (req, res) => {
  try {
    const result = await deleteAttendance(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
