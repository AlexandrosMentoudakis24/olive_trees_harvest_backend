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

    res.send({
      message: "Fetched data successfully!",
      oliveTreesHarvests: user.oliveTreesHarvests,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.addNewOliveTreesHarvest = async (req, res, next) => {
  const { userId, title } = req.body;

  try {
    const user = await User.findById(userId);

    const newOliveTreesHarvest = new OliveTreesHarvestModel({ title });

    user.oliveTreesHarvests.push(newOliveTreesHarvest);

    await user.save();
    res.send({
      message: "Olive Trees Harvest added!",
      oliveTreesHarvest: newOliveTreesHarvest,
    });
  } catch (err) {
    err.message = "Failed to find User!";

    next(err);
  }
};
