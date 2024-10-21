const Expense = require("../models/expenseModel");
const catchAsync = require("../util/catchAsync");
const AppError = require("../util/appError");

// CREATE EXPENSE
exports.createExpense = catchAsync(async (req, res, next) => {
  // Create expense
  const expense = await Expense.create({
    title: req.body.title,
    user: req.user._id,
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date,
  });

  // Send response
  res.status(201).json({
    status: "success",
    message: "Expense created successfully",
    data: {
      expense,
    },
  });
});

// GET ALL EXPENSES
exports.getAllExpenses = catchAsync(async (req, res, next) => {
  // Get all expenses
  const expenses = await Expense.find({ user: req.user._id });

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      expenses,
    },
  });
});

// GET ONE EXPENSE
exports.getOneExpense = catchAsync(async (req, res, next) => {
  // Get expense
  const expense = await Expense.findById(req.params.id);

  // Check if expense was not found
  if (!expense) {
    return next(new AppError("No expense found with that id", 404));
  }

  // Send response
  res.status(200).json({
    status: "success",
    data: {
      expense,
    },
  });
});

// UPDATE EXPENSE
exports.updateExpense = catchAsync(async (req, res, next) => {
  // Update expense
  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  // Send response
  res.status(200).json({
    status: "success",
    message: "Expense updated successfully",
    data: {
      expense: updatedExpense,
    },
  });
});

// DELETE EXPENSE
exports.deleteExpense = catchAsync(async (req, res, next) => {
  // Delete expense
  await Expense.findByIdAndDelete(req.params.id);

  // Send response
  res.status(204).json({
    status: "success",
  });
});
