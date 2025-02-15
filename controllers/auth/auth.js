const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const { User } = require("../../models/user");

exports.login = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error(errors.array()[0].msg);

		error.statusCode = 422;

		next(error);

		return;
	}

	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email: email });

		if (!user) {
			const error = new Error("This E-Mail does not exist!");

			error.statusCode = 404;

			throw error;
		}

		const doPasswordsMatch = await bcrypt.compare(password, user.password);

		if (!doPasswordsMatch) {
			const error = new Error("Credentials do not match!");

			error.statusCode = 404;

			throw error;
		}

		const jwt = require("jsonwebtoken");

		const token = jwt.sign(
			{ email: email, userId: user.id.toString() },
			process.env.JSON_WEB_TOKEN_SECRET_KEY,
			{
				expiresIn: "5y",
			},
		);

		const response = {
			message: "User is authenticated!",
			token: token,
			user: user,
		};

		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

exports.signup = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		const error = new Error(errors.array()[0].msg);

		error.statusCode = 422;

		next(error);

		return;
	}

	const userData = req.body;

	try {
		const hashedPassword = await bcrypt.hash(userData.password, 12);

		userData.password = hashedPassword;

		const user = new User({ ...userData });

		await user.save();

		res.status(201).send({ message: "User was created.", user: user });
	} catch (err) {
		console.log(err);
		const newError = new Error("Failed to create User.");

		next(newError);
	}
};
