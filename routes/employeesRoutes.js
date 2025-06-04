const express = require("express");
const router = express.Router();
const {
  fetchAllEmployees,
  fetchEmployeeById,
  registerEmployee,
  modifyEmployee,
  removeEmployee,
} = require("../controllers/employeeController");

router.get("/", fetchAllEmployees);
router.get("/:id", fetchEmployeeById);
router.post("/", registerEmployee);
router.put("/:id", modifyEmployee);
router.delete("/:id", removeEmployee);

module.exports = router;
