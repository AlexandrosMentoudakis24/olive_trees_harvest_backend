const mongoose = require("mongoose");

const ExpenseTypes = Object.freeze({
	employees: "employees",
	burlap: "burlap",
	fertilizers: "fertilizers",
	spraying: "spraying",
	prunning: "prunning",
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

const OliveTreesExpenseModel = mongoose.model(
	"olivetreesexpense",
	oliveTreesExpenseSchema,
);

module.exports = {
	ExpenseTypes,
	oliveTreesExpenseSchema,
	OliveTreesExpenseModel,
};
