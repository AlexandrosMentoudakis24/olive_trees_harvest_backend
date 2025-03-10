const mongoose = require("mongoose");

exports.initMongoDB = async () => {
	const mongoDBConnectionUri = process.env.MONGO_DB_CONNECTION_URI;
	const mongoDBName = process.env.MONGO_DB_NAME;

	const mongoConnectionUri = mongoDBConnectionUri + mongoDBName;

	try {
		if (
			mongoConnectionUri == undefined ||
			mongoDBConnectionUri == undefined ||
			mongoDBName == undefined
		) {
			throw new Error("Mongo URI variable is not defined!");
		}

		await mongoose.connect(mongoConnectionUri, {});
		console.log("Mongo DB is connected!");

		return true;
	} catch (err) {
		console.log("Mongo DB connection failed!");

		return true;
	}
};
