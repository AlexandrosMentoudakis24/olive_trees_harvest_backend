const {
  OliveTreesExpenseModel,
  ExpenseTypes,
} = require("../../models/olive_trees_harvest/olive_trees_expense");
const { User } = require("../../models/user");

exports.getSingleOliveTreesExpense = async (req, res, next) => {
  const { userId, harvestId, expenseId } = req.params;

  try {
    const { expenses } = await getUsersOliveTreesExpenses(userId, harvestId);

    const expense = expenses.id(expenseId);

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
    const { expenses } = await getUsersOliveTreesExpenses(userId, harvestId);

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
  console.log(req.body);
  const { userId, harvestId } = req.body;

  try {
    const { user, expenses } = await getUsersOliveTreesExpenses(
      userId,
      harvestId,
    );

    const newExpense = await saveSingleExpense(expenses, req.body, false);

    await user.save();

    const response = {
      message: "Olive Trees Expense added.",
      oliveTreesExpense: newExpense,
    };

    console.log(response);

    res.status(201).send(response);
  } catch (err) {
    console.log(err);

    next(err);
  }
};

exports.updateSingleOliveTreesExpense = async (req, res, next) => {
  const { userId, harvestId } = req.body;

  try {
    const { user, expenses } = await getUsersOliveTreesExpenses(
      userId,
      harvestId,
    );

    const expense = await saveSingleExpense(expenses, req.body, true);

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
    const { user, expenses } = await getUsersOliveTreesExpenses(
      userId,
      harvestId,
    );

    const expense = expenses.id(expenseId);

    if (!expense) {
      throw new Error("Failed to find Olive Trees Expense");
    }

    expense.deleteOne();

    await user.save();

    const response = {
      message: "Olive Trees Expense deleted.",
    };

    res.status(200).send(response);
  } catch (err) {
    console.log(err);

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

  return { user: user, expenses: oliveTreesHarvest.expenses };
};

const saveSingleExpense = async (expenses, newExpenseInfos, isUpdateAction) => {
  try {
    const { description, expenseType, costAmount } = newExpenseInfos;

    const formattedExpenseType = ExpenseTypes[expenseType];

    var expense;

    if (!isUpdateAction) {
      expense = new OliveTreesExpenseModel({
        description: description,
        expenseType: formattedExpenseType,
        costAmount: costAmount,
      });

      expenses.push(expense);
    } else {
      const { expenseId } = newExpenseInfos;

      expense = expenses.id(expenseId);

      if (!expense) {
        throw new Error("Failed to find Olive Trees Expense.");
      }

      expense.description = description;
      expense.expenseType = formattedExpenseType;
      expense.costAmount = costAmount;

      await expense.save();
    }

    return expense;
  } catch (err) {
    console.log(err);

    throw new Error("Failed to save Olive Trees Expense.");
  }
};
