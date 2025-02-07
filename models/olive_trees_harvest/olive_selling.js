const mongoose = require("mongoose");

const oliveSellingSchema = new mongoose.Schema(
	{
		oliveAmount: {
			type: Number,
			required: true,
		},
		sellingPrice: {
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
	},
);

const OliveSellingModel = mongoose.model("oliveselling", oliveSellingSchema);

module.exports = { oliveSellingSchema, OliveSellingModel };
