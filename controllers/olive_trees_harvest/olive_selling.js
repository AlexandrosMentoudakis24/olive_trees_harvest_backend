const {
	OliveSellingModel,
} = require("../../models/olive_trees_harvest/olive_selling");
const getUserAndItsHarvest = require("./olive_trees_harvest_helper_functions");

exports.addNewOliveSelling = async (req, res, next) => {
	const { userId, harvestId } = req.body;

	try {
		const { user, harvest } = await getUserAndItsHarvest(userId, harvestId);

		const { oliveAmount, sellingPrice } = req.body;

		if (harvest.totalAvailableOliveAmount - oliveAmount < 0.0) {
			throw new Error("Insufficient Olive Amount.");
		}

		const newOliveSelling = new OliveSellingModel({
			oliveAmount,
			sellingPrice,
		});

		const totalCalcProfit =
			newOliveSelling.oliveAmount * newOliveSelling.sellingPrice;

		harvest.sellings.push(newOliveSelling);
		harvest.totalSellings += 1;
		harvest.totalAvailableOliveAmount -= newOliveSelling.oliveAmount;
		harvest.totalProfit += totalCalcProfit;
		harvest.totalIncome += totalCalcProfit;

		await user.save();

		res.status(201).send({
			message: "Olive Selling added!",
			oliveSelling: newOliveSelling,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteOliveSelling = async (req, res, next) => {
	const { userId, harvestId, oliveSellingId } = req.params;

	try {
		const { user, harvest } = await getUserAndItsHarvest(userId, harvestId);

		const oliveSelling = harvest.sellings.id(oliveSellingId);

		if (!oliveSelling) {
			throw new Error("Failed to find Olive Selling.");
		}

		oliveSelling.deleteOne();

		if (!oliveSelling.$isDeleted) {
			throw new Error("Failed to delete Olive Selling");
		}

		const totalCalcProfit =
			oliveSelling.oliveAmount * oliveSelling.sellingPrice;

		harvest.totalSellings -= 1;
		harvest.totalAvailableOliveAmount += oliveSelling.oliveAmount;
		harvest.totalProfit -= totalCalcProfit;
		harvest.totalIncome -= totalCalcProfit;

		await user.save();

		res.status(200).send({
			message: "Olive Selling added!",
		});
	} catch (err) {
		next(err);
	}
};
