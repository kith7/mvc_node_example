const express = require("express");
const router = express.Router();
const {
  getAllEMployees,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployee,
} = require("../../controllers/employeesControler.js");

const { route } = require("../subdir");

router
  .route("/")
  .get(getAllEMployees)
  .post(createNewEmployee)
  .put(updateEmployee)
  .delete(deleteEmployee);

//we can get dynamic routes fo ids:
router.route("/:id").get(getEmployee);

module.exports = router;
