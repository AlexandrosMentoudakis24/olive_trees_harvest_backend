const mongoose = require("mongoose");

const { oliveTreesExpenseSchema } = require("./olive_trees_expense");
const { oliveMillingSchema } = require("./olive_milling");
const { oliveSellingSchema } = require("./olive_selling");

const oliveTreesHarvestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    expenses: {
      type: [oliveTreesExpenseSchema],
      default: [],
    },
    millings: {
      type: [oliveMillingSchema],
      default: [],
    },
    sellings: {
      type: [oliveSellingSchema],
      default: [],
    },
    totalHarvestedOliveAmount: {
      type: Number,
      default: 0.0,
    },
    totalRealOliveAmount: {
      type: Number,
      default: 0.0,
    },
    totalAvailableOliveAmount: {
      type: Number,
      default: 0.0,
    },
    totalMillings: {
      type: Number,
      default: 0,
    },
    totalSellings: {
      type: Number,
      default: 0,
    },
    totalProfit: {
      type: Number,
      default: 0,
    },
    totalExpenses: {
      type: Number,
      default: 0,
    },
    totalIncome: {
      type: Number,
      default: 0,
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

const OliveTreesHarvestModel = mongoose.model(
  "olivetreesharvest",
  oliveTreesHarvestSchema
);

module.exports = { oliveTreesHarvestSchema, OliveTreesHarvestModel };
