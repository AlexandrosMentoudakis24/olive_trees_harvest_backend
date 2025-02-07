const mongoose = require("mongoose");

const { oliveMillingSchema } = require("./olive_milling");
const { oliveSellingSchema } = require("./olive_selling");

const oliveTreesHarvestSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		millings: {
			type: [oliveMillingSchema],
			default: [],
		},
		sellings: {
			type: [oliveSellingSchema],
			default: [],
		},
		totalOliveFruitAmount: {
			type: Number,
			default: 0.0,
		},
		totalOliveAmount: {
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
	},
);

const OliveTreesHarvestModel = mongoose.model(
	"olivetreesharvest",
	oliveTreesHarvestSchema,
);

module.exports = { oliveTreesHarvestSchema, OliveTreesHarvestModel };
