const express = require("express");
const router = express.Router();

const {
  fetchAllAttendance,
  fetchAttendanceById,
  registerAttendance,
  modifyAttendance,
  removeAttendance,
} = require("../controllers/attendanceController");

router.get("/", fetchAllAttendance);
router.get("/:id", fetchAttendanceById);
router.post("/", registerAttendance);
router.put("/:id", modifyAttendance);
router.delete("/:id", removeAttendance);

module.exports = router;
