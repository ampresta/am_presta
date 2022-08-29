const db = require("../../config/database");
const { User, Collaborateur } = db.models;
const argon2 = require("argon2");
module.exports = async (req, res) => {
  try {
    const { collab } = req;
    const { password } = req.body;
    if (!password || !collab) {
      return res.send({ status: false, msg: "Check parameters" });
    }
    const user = await User.findOne({
      include: {
        model: Collaborateur,
        where: {
          id: collab,
        },
      },
    });
    if (user === null)
      return res.send({ status: false, msg: "User Not found!" });

    const pep = process.env.PEPPER;

    const checkUser = await argon2.verify(user.password, password + pep);

    return res.send({ status: checkUser });
  } catch (err) {
    return res.send("error: " + err);
  }
};
