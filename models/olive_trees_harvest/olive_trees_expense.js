const mongoose = require("mongoose");

const ExpenseTypes = Object.freeze({
  employees: "employees",
  burlap: "burlap",
  fertilizers: "employees",
  spraying: "employees",
  prunning: "employees",
});

const oliveTreesExpenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    expenseType: {
      type: String,
      enum: Object.values(ExpenseTypes),
      required: true,
    },
    costAmount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    autoCreate: false,
  }
);

const OliveTreesExpenseModel = mongoose.model(
  "olivetreesexpense",
  oliveTreesExpenseSchema
);

module.exports = {
  ExpenseTypes,
  oliveTreesExpenseSchema,
  OliveTreesExpenseModel,
};
