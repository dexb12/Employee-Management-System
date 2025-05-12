const { createAttendance } = require("./attendanceQueries");

async function test() {
  try {
    console.log("📝 Creating new attendance record...");
    console.log(
      await createAttendance("2025-05-13 08:00:00", "2025-05-13 17:00:00")
    );
  } catch (error) {
    console.error("🚨 Test error:", error);
  }
}
