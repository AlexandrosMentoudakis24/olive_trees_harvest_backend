const express = require("express");

const router = express.Router();

const oliveTreesHarvestController = require("../../controllers/olive_trees_harvest/olive_trees_harvest");
const isAuth = require("../../middlewares/isAuth");

router.get(
	"/:userId",
	isAuth,
	oliveTreesHarvestController.getOliveTreesHarvests,
);

router.post(
	"/addNewOliveTreesHarvest",
	isAuth,
	oliveTreesHarvestController.addNewOliveTreesHarvest,
);

router.put(
	"/updateOliveTreesHarvest",
	isAuth,
	oliveTreesHarvestController.updateSingleOliveTreesHarvest,
);

router.delete(
	"/deleteOliveTreesHarvest/:userId/:harvestId",
	isAuth,
	oliveTreesHarvestController.deleteSingleOliveTreesHarvest,
);

module.exports = router;
