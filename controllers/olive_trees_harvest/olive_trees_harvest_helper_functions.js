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

const validateImageInRequest = (req, hasImage) => {
	console.log("File path:" + req.file);

	if (hasImage && !req.file) {
		const error = new Error("No image provided!");

		error.statusCode = 422;

		throw error;
	}

	return hasImage ? req.file.path.replaceAll("\\", "/") : "";
};

module.exports = {
	getUserAndItsHarvest,
	validateImageInRequest,
};
