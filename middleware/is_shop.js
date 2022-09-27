module.exports = async (req, res, next) => {
  try {
    const { user } = req;
    if (user.fk_user_id !== req.user.id) {
      throw { status: 409, message: "Shop does not belong to user." };
    }
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(err.status || 500)
      .send(err.message || "Something went wrong");
  }
};
