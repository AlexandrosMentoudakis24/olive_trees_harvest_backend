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
		imageUrlPath: {
			type: String,
			default: "",
		},
		createdAt: {
			type: String,
			required: true,
		},
		updatedAt: {
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

const OliveSellingModel = mongoose.model("oliveselling", oliveSellingSchema);

module.exports = { oliveSellingSchema, OliveSellingModel };
