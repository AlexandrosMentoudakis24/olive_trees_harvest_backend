const express = require("express");

const router = express.Router();

const oliveTreesExpenseController = require("../../controllers/olive_trees_harvest/olive_trees_expense");

const isAuth = require("../../middlewares/isAuth");

router.get(
  "/:userId/:harvestId",
  isAuth,
  oliveTreesExpenseController.getOliveTreesExpenses,
);

router.get(
  "/:userId/:harvestId/:expenseId",
  isAuth,
  oliveTreesExpenseController.getSingleOliveTreesExpense,
);

router.post(
  "/addNewOliveTreesExpense",
  isAuth,
  oliveTreesExpenseController.addNewOliveTreesExpense,
);

router.put(
  "/updateOliveTreesExpense",
  isAuth,
  oliveTreesExpenseController.updateSingleOliveTreesExpense,
);

router.delete(
  "/deleteOliveTreesExpense/:userId/:harvestId/:expenseId",
  isAuth,
  oliveTreesExpenseController.deleteSingleOliveTreesExpense,
);

// to-do: implement controller 
//router.delete(
//  "/deleteOliveTreesExpenses/:userId/:harvestId",
//  isAuth,
//  oliveTreesExpenseController.deleteSingleOliveTreesExpense,
//);

module.exports = router;
