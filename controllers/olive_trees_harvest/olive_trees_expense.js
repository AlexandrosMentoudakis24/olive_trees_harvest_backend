const fs = require("fs");

const {
	OliveTreesExpenseModel,
	ExpenseTypes,
} = require("../../models/olive_trees_harvest/olive_trees_expense");
const { User } = require("../../models/user");
const {
	validateImageInRequest,
	getUserAndItsHarvest,
} = require("./olive_trees_harvest_helper_functions");

exports.getSingleOliveTreesExpense = async (req, res, next) => {
	const { userId, harvestId, expenseId } = req.params;

	try {
		const { harvest } = await getUserAndItsHarvest(userId, harvestId);

		const expense = harvest.expenses.id(expenseId);
		if (!expense) {
			throw new Error("Failed to find Olive Trees Expense.");
		}

		const response = {
			message: "Fetched data successfully!",
			expense: expense,
		};

		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

exports.getOliveTreesExpenses = async (req, res, next) => {
	const { userId, harvestId } = req.params;

	try {
		const { harvest } = await getUserAndItsHarvest(userId, harvestId);

		const expenses = harvest.expenses;

		if (!expenses) {
			throw new Error("Failed to find Olive Trees Expenses.");
		}

		const response = {
			message: "Fetched data successfully!",
			expenses: expenses,
		};

		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

exports.addNewOliveTreesExpense = async (req, res, next) => {
	const { userId, harvestId, hasImage } = req.body;

	try {
		const { user, harvest } = await getUserAndItsHarvest(userId, harvestId);

		const reqFilePath = validateImageInRequest(req, hasImage);

		const newExpense = await saveSingleExpense(harvest, req.body, reqFilePath);

		harvest.totalProfit -= newExpense.costAmount;
		harvest.totalExpenses += newExpense.costAmount;

		await user.save();

		const response = {
			message: "Olive Trees Expense added.",
			oliveTreesExpense: newExpense,
		};

		res.status(201).send(response);
	} catch (err) {
		console.log(err);
		next(err);
	}
};

exports.updateSingleOliveTreesExpense = async (req, res, next) => {
	const { userId, harvestId, hasImage } = req.body;

	try {
		const { user, harvest } = await getUserAndItsHarvest(userId, harvestId);

		const reqFilePath = validateImageInRequest(req, hasImage);

		const expense = await saveSingleExpense(harvest, req.body, reqFilePath);

		await user.save();

		const response = {
			message: "Olive Trees Expense updated.",
			expense: expense,
		};

		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

exports.deleteSingleOliveTreesExpense = async (req, res, next) => {
	const { userId, harvestId, expenseId } = req.params;

	try {
		const { user, harvest } = await getUserAndItsHarvest(userId, harvestId);

		const expense = harvest.expenses.id(expenseId);

		if (!expense) {
			throw new Error("Failed to find Olive Trees Expense");
		}

		expense.deleteOne();

		if (!expense.$isDeleted) {
			throw new Error("Failed to delete Olive Trees Expense");
		}

		const hasImageFile = expense.imageUrlPath.trim().length > 1;

		if (hasImageFile)
			fs.unlink(expense.imageUrlPath, (err) => {
				if (err) {
					throw new Error("Failed to delete Image File.");
				}
			});

		harvest.totalProfit += expense.costAmount;
		harvest.totalExpenses -= expense.costAmount;

		await user.save();

		const response = {
			message: "Olive Trees Expense deleted.",
		};

		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const saveSingleExpense = async (harvest, newExpenseInfos, imageUrlPath) => {
	try {
		const { expenseId, description, expenseType, costAmount, createdAt } =
			newExpenseInfos;

		const formattedExpenseType = ExpenseTypes[expenseType];

		const foundExpense = harvest.expenses.id(expenseId);

		if (!foundExpense) {
			const expense = new OliveTreesExpenseModel({
				description: description,
				expenseType: formattedExpenseType,
				costAmount: costAmount,
				imageUrlPath: imageUrlPath,
				createdAt: createdAt,
			});

			harvest.expenses.push(expense);

			await harvest.save();

			return expense;
		}

		foundExpense.description = description;
		foundExpense.expenseType = formattedExpenseType;
		foundExpense.costAmount = costAmount;

		await foundExpense.save();

		return foundExpense;
	} catch (err) {
		throw new Error("Failed to save Olive Trees Expense.");
	}
};
