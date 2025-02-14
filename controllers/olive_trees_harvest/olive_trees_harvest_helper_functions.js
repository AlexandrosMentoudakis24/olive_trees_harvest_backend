const { User } = require("../../models/user");

const getUserAndItsHarvest = async (userId, harvestId) => {
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

module.exports = getUserAndItsHarvest;
