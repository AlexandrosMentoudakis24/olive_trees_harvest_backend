const {
	OliveMillingModel,
} = require("../../models/olive_trees_harvest/olive_milling");
const { User } = require("../../models/user");

exports.addNewOliveMilling = async (req, res, next) => {
	const { userId, oliveTreesHarvestId } = req.body;

	try {
		const user = await User.findById(userId);

		const oliveTreesHarvest = user.oliveTreesHarvests.id(oliveTreesHarvestId);

		const {
			factoryName,
			oliveFruitAmount,
			oliveAmount,
			factoryTaxRate,
			oxidity,
		} = req.body;

		const newOliveMilling = new OliveMillingModel({
			factoryName,
			oliveFruitAmount,
			oliveAmount,
			factoryTaxRate,
			oxidity,
		});

		oliveTreesHarvest.millings.push(newOliveMilling);
		oliveTreesHarvest.totalMillings += 1;
		oliveTreesHarvest.totalOliveFruitAmount += newOliveMilling.oliveFruitAmount;
		oliveTreesHarvest.totalOliveAmount += newOliveMilling.oliveAmount;
		oliveTreesHarvest.totalAvailableOliveAmount +=
			newOliveMilling.oliveAmount -
			newOliveMilling.factoryTaxRate * newOliveMilling.oliveAmount;

		await user.save();

		res.send({
			message: "Olive Milling added!",
			oliveMilling: newOliveMilling,
		});
	} catch (err) {
		err.message = "Failed to find User!";

		next(err);
	}
};

exports.deleteOliveMilling = async (req, res, next) => {
	const { userId, oliveTreesHarvestId, oliveMillingId } = req.body;

	try {
		const user = await User.findById(userId);

		user.oliveTreesHarvests
			.id(oliveTreesHarvestId)
			.millings.id(oliveMillingId)
			.deleteOne();

		await user.save();

		res.send({ message: "Olive Milling deleted.", statusCode: 200 });
	} catch (err) {
		err.message = "Failed to delete milling.";

		next(err);
	}
};
