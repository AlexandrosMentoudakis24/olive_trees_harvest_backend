const {
	OliveMillingModel,
} = require("../../models/olive_trees_harvest/olive_milling");
const {
	getUserAndItsHarvest,
	validateImageInRequest,
} = require("./olive_trees_harvest_helper_functions");

exports.addNewOliveMilling = async (req, res, next) => {
	const { userId, harvestId, hasImage } = req.body;

	try {
		const { user, harvest } = await getUserAndItsHarvest(userId, harvestId);

		const imageUrlPath = validateImageInRequest(req, hasImage);

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
			imageUrlPath,
		});

		harvest.millings.push(newOliveMilling);
		harvest.totalMillings += 1;
		harvest.totalOliveFruitAmount += newOliveMilling.oliveFruitAmount;
		harvest.totalRealOliveAmount += newOliveMilling.oliveAmount;
		harvest.totalAvailableOliveAmount += calcOliveMillingsAfterTaxedOlive(
			newOliveMilling.oliveAmount,
			newOliveMilling.factoryTaxRate,
		);

		await user.save();

		res.status(201).send({
			message: "Olive Milling added!",
			oliveMilling: newOliveMilling,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteOliveMilling = async (req, res, next) => {
	const { userId, harvestId, oliveMillingId } = req.params;

	try {
		const { user, harvest } = await getUserAndItsHarvest(userId, harvestId);

		const oliveMilling = harvest.millings.id(oliveMillingId);

		if (!oliveMilling) {
			throw new Error("Failed to find Olive Milling.");
		}

		oliveMilling.deleteOne();

		if (!oliveMilling.$isDeleted) {
			throw new Error("Failed to delete Olive Milling");
		}

		harvest.totalMillings -= 1;
		harvest.totalOliveFruitAmount -= oliveMilling.oliveFruitAmount;
		harvest.totalRealOliveAmount -= oliveMilling.oliveAmount;
		harvest.totalAvailableOliveAmount -= calcOliveMillingsAfterTaxedOlive(
			oliveMilling.oliveAmount,
			oliveMilling.factoryTaxRate,
		);

		await user.save();

		res.status(200).send({ message: "Olive Milling deleted." });
	} catch (err) {
		next(err);
	}
};

const calcOliveMillingsAfterTaxedOlive = (oliveAmount, taxRate) => {
	return oliveAmount - oliveAmount * taxRate;
};
