const express = require("express");

const router = express.Router();

const oliveMillingController = require("../../controllers/olive_trees_harvest/olive_milling");
const isAuth = require("../../middlewares/isAuth");

router.post(
	"/addNewOliveMilling",
	isAuth,
	oliveMillingController.addNewOliveMilling,
);

router.delete(
	"/deleteOliveMilling",
	isAuth,
	oliveMillingController.deleteOliveMilling,
);

module.exports = router;
