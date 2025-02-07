const mongoose = require("mongoose");

const oliveMillingSchema = new mongoose.Schema(
	{
		factoryName: {
			type: String,
			required: true,
		},
		oliveFruitAmount: {
			type: Number,
			required: true,
		},
		oliveAmount: {
			type: Number,
			required: true,
		},
		factoryTaxRate: {
			type: Number,
			required: true,
		},
		oxidity: {
			type: Number,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		autoCreate: false,
	},
);

const OliveMillingModel = mongoose.model("olivemilling", oliveMillingSchema);

module.exports = { oliveMillingSchema, OliveMillingModel };
