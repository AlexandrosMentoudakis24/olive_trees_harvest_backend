const express = require("express");

const router = express.Router();

const oliveSellingController = require("../../controllers/olive_trees_harvest/olive_selling");
const isAuth = require("../../middlewares/isAuth");

router.post(
	"/addNewOliveSelling",
	isAuth,
	oliveSellingController.addNewOliveSelling,
);

router.delete(
	"/deleteOliveSelling/:userId/:harvestId/:oliveSellingId",
	isAuth,
	oliveSellingController.deleteOliveSelling,
);

module.exports = router;
