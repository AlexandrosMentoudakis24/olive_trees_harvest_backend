const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const authHeader = req.get("Authorization");

	try {
		if (!authHeader) {
			const err = new Error("Authorization Header is missing!");

			err.statusCode = 401;

			throw err;
		}

		const token = authHeader.split(" ")[1];

		if (!token) {
			const err = new Error("Token implementation error.");

			err.statusCode = 401;
		}

		let decodedToken;

		decodedToken = jwt.verify(token, process.env.JSON_WEB_TOKEN_SECRET_KEY);

		if (!decodedToken) {
			const err = new Error("Not authenticated!");

			err.statusCode = 401;

			throw err;
		}
	} catch (err) {
		next(err);

		return;
	}

	next();
};
