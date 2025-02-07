const mongoose = require("mongoose");

exports.initMongoDB = async () => {
	const mongoDBUri = process.env.MONGODBCONNECTIONURI;

	try {
		if (mongoDBUri == undefined) {
			throw new Error("Mongo URI variable is not defined!");
		}

		await mongoose.connect(mongoDBUri, {});
	} catch (err) {
		console.log("Mongo DB connection failed!");
	}
};
