const express = require("express");
const authController = require("../controllers/authController");
const expenseController = require("../controllers/expenseController");

const router = express.Router();

router.use(authController.protect);

router.post("/createExpense", expenseController.createExpense);
router.get("/getAllExpenses", expenseController.getAllExpenses);
router.get("/getOneExpense/:id", expenseController.getOneExpense);
router.patch("/updateExpense/:id", expenseController.updateExpense);
router.delete("/deleteExpense/:id", expenseController.deleteExpense);

module.exports = router;
