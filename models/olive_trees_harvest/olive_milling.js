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
		toJSON: {
			virtuals: true,
			transform: function (_, ret) {
				ret.id = ret._id.toString();

				delete ret._id;
				delete ret.__v;
			},
		},
		toObject: {
			virtuals: true,
		},
	},
);

const OliveMillingModel = mongoose.model("olivemilling", oliveMillingSchema);

module.exports = { oliveMillingSchema, OliveMillingModel };
