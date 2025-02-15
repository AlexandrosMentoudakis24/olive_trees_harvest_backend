const mongoose = require("mongoose");
const {
	oliveTreesHarvestSchema,
} = require("./olive_trees_harvest/olive_trees_harvest");

const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		birthDate: {
			type: String,
			required: true,
		},
		telephone: {
			type: String,
			required: true,
		},
		gender: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		imageUrlPath: {
			type: String,
			default: "",
		},
		oliveTreesHarvests: {
			type: [oliveTreesHarvestSchema],
			default: [],
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
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;

				delete ret._id;
				delete ret.__v;
			},
		},
	},
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
