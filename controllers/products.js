const { sequelize } = require("../models");

module.exports = {
  postProduct: async (req, res) => {
    const transaction = sequelize.transaction();
    try {
      await transaction.commit();
      res.status(200).send("success");
    } catch (err) {
      console.log(err);
      await transaction.rollBack();
      return res
        .status(err.status || 500)
        .message(err.message || "something went wrong");
    }
  },
};
