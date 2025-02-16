const {
	OliveTreesHarvestModel,
} = require("../../models/olive_trees_harvest/olive_trees_harvest");
const { User } = require("../../models/user");

exports.getOliveTreesHarvests = async (req, res, next) => {
	const { userId } = req.params;

	try {
		const user = await User.findById(userId);

		if (!user) {
			throw new Error("Failed to find User.");
		}

		const response = {
			message: "Fetched data successfully!",
			oliveTreesHarvests: user.oliveTreesHarvests,
		};

		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

exports.addNewOliveTreesHarvest = async (req, res, next) => {
	const { userId, title, createdAt } = req.body;

	try {
		const user = await User.findById(userId);

		const newOliveTreesHarvest = new OliveTreesHarvestModel({
			title,
			createdAt,
		});

		user.oliveTreesHarvests.push(newOliveTreesHarvest);

		await user.save();

		const response = {
			message: "Olive Trees Harvest added!",
			oliveTreesHarvest: newOliveTreesHarvest,
		};

		res.status(201).send(response);
	} catch (err) {
		err.message = "Failed to find User!";

		next(err);
	}
};

exports.deleteSingleOliveTreesHarvest = async (req, res, next) => {
	const { userId, harvestId } = req.params;

	try {
		const user = await User.findById(userId);

		if (!user) {
			throw new Error();
		}

		const foundHarvest = user.oliveTreesHarvests.id(harvestId);

		if (!foundHarvest) {
			throw new Error();
		}

		foundHarvest.deleteOne();

		await user.save();

		const response = {
			message: "Olive Trees Harvest deleted.",
		};

		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

exports.updateSingleOliveTreesHarvest = async (req, res, next) => {
	const { userId, harvestId, newHarvestTitle } = req.body;

	try {
		const user = await User.findById(userId);

		if (!user) {
			throw new Error();
		}

		const foundHarvest = user.oliveTreesHarvests.id(harvestId);

		if (!foundHarvest) {
			throw new Error();
		}

		foundHarvest.title = newHarvestTitle;

		await user.save();

		const response = {
			message: "Olive Trees Harvest updated!",
		};

		res.status(204).send(response);
	} catch (err) {
		err.message = "Failed to find User!";

		next(err);
	}
};
