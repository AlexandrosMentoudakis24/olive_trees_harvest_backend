const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

const ImageTypeEnum = Object.freeze({
	oliveTreesExpense: "oliveTreesExpense",
	oliveMilling: "oliveMilling",
	oliveSelling: "oliveSelling",
});

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		const imageTypeHeader = req.get("TypeOfImage");

		const imageType = ImageTypeEnum[imageTypeHeader];

		switch (imageType) {
			case ImageTypeEnum.oliveTreesExpense:
				cb(null, "images/oliveTreesExpenseImages");
				break;
			case ImageTypeEnum.oliveMilling:
				cb(null, "images/oliveMillingImages");
				break;
			case ImageTypeEnum.oliveSelling:
				cb(null, "images/oliveSellingImages");
				break;
			default:
				break;
		}
	},
	filename: (req, file, cb) => {
		const imageFileName = "img_" + uuidv4() + "_" + file.originalname;

		cb(null, imageFileName);
	},
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg"
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

module.exports = {
	fileStorage: fileStorage,
	fileFilter: fileFilter,
};
