const {
	OliveTreesExpenseModel,
	ExpenseTypes,
} = require("../../models/olive_trees_harvest/olive_trees_expense");
const { User } = require("../../models/user");

exports.getSingleOliveTreesExpense = async (req, res, next) => {
	const { userId, harvestId, expenseId } = req.params;

	try {
		const { harvest } = await getUsersOliveTreesExpenses(userId, harvestId);

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
		console.log(err);

		next(err);
	}
};

exports.getOliveTreesExpenses = async (req, res, next) => {
	const { userId, harvestId } = req.params;

	try {
		const { harvest } = await getUsersOliveTreesExpenses(userId, harvestId);

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
		console.log(err);

		next(err);
	}
};

exports.addNewOliveTreesExpense = async (req, res, next) => {
	const { userId, harvestId } = req.body;

	try {
		if (!req.file) {
			console.log("error");
			const error = new Error("No image provided!");

			error.statusCode = 422;

			next(error);

			return;
		}

		const { user, harvest } = await getUsersOliveTreesExpenses(
			userId,
			harvestId,
		);

		const newExpense = await saveSingleExpense(
			harvest,
			req.body,
			req.file.path,
		);

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
	const { userId, harvestId } = req.body;

	try {
		const { user, harvest } = await getUsersOliveTreesExpenses(
			userId,
			harvestId,
		);

		const expense = await saveSingleExpense(harvest, req.body, req.file.path);

		await user.save();

		const response = {
			message: "Olive Trees Expense updated.",
			expense: expense,
		};

		res.status(200).send(response);
	} catch (err) {
		console.log(err);

		next(err);
	}
};

exports.deleteSingleOliveTreesExpense = async (req, res, next) => {
	const { userId, harvestId, expenseId } = req.params;

	try {
		const { user, harvest } = await getUsersOliveTreesExpenses(
			userId,
			harvestId,
		);

		const expense = harvest.expenses.id(expenseId);

		if (!expense) {
			throw new Error("Failed to find Olive Trees Expense");
		}

		expense.deleteOne();

		if (!expense.$isDeleted) {
			throw new Error("Failed to delete Olive Trees Expense");
		}

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

const getUsersOliveTreesExpenses = async (userId, harvestId) => {
	const user = await User.findById(userId);

	if (!user) {
		throw new Error("Failed to find User.");
	}

	const oliveTreesHarvest = user.oliveTreesHarvests.id(harvestId);

	if (!oliveTreesHarvest) {
		throw new Error("Failed to Olive Trees Harvest.");
	}

	return {
		user: user,
		harvest: oliveTreesHarvest,
	};
};

const saveSingleExpense = async (harvest, newExpenseInfos, imageFilePath) => {
	try {
		const { expenseId, description, expenseType, costAmount } = newExpenseInfos;
		const imageUrlPath = imageFilePath.replaceAll("\\", "/");

		const formattedExpenseType = ExpenseTypes[expenseType];

		const foundExpense = harvest.expenses.id(expenseId);

		if (!foundExpense) {
			const expense = new OliveTreesExpenseModel({
				description: description,
				expenseType: formattedExpenseType,
				costAmount: costAmount,
				imageUrlPath: imageUrlPath,
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
		console.log(err);

		throw new Error("Failed to save Olive Trees Expense.");
	}
};
