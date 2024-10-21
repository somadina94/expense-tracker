const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide your expense title"],
    },
    amount: {
      type: Number,
      required: [true, "Please provide your expense amount"],
    },
    date: {
      type: Date,
      required: [true, "Please provide your expense date"],
    },
    description: {
      type: String,
      required: [true, "Please provide your expense description"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Expense must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
