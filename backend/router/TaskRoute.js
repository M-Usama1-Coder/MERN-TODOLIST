const express = require("express");
const {
  getAllTask,
  getSingleTask,
  updateTask,
  deleteTask,
  createTask,
} = require("../controller/Tasks");
const router = express.Router();

router.route("/").get(getAllTask).post(createTask);
router.route("/:id").get(getSingleTask).put(updateTask).delete(deleteTask);

module.exports = router;
