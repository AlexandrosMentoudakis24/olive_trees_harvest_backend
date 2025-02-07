const express = require("express");

const router = express.Router();

const authControllers = require("../../controllers/auth/auth");
const { body } = require("express-validator");

router.post(
	"/login",
	[
		body("email", "E-Mail value was invalid!").isEmail(),
		body("password", "Password value was invalid!").isLength({ min: 8 }),
	],
	authControllers.login,
);

router.post(
	"/signup",
	[
		body("firstName", "First Name must be at least 4 chars long.")
			.trim()
			.isLength({
				min: 4,
			}),
		body("lastName", "Last Name must be at least 4 chars long.")
			.trim()
			.isLength({
				min: 4,
			}),
		body("telephone", "Telephone must have 10 digits.").trim().isLength(10),
		body("username", "Username must be at least 5 chars long.")
			.trim()
			.isLength({
				min: 5,
			}),
		body("email", "E-Mail value was invalid!").isEmail(),
		body("password").custom((value, { req }) => {
			const password = value.trim();
			const rePassword = req.body.rePassword.trim();

			if (value.length < 8) {
				throw new Error("Password must be at least 8 chars long!");
			}

			if (password != rePassword) {
				throw new Error("Passwords do not match");
			}

			return true;
		}),
	],

	authControllers.signup,
);

module.exports = router;
