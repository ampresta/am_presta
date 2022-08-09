const db = require("../../config/database");
const { SuperAdmin, Collaborateur } = db.models;
const { verify } = require("jsonwebtoken");

module.exports = async (req, res) => {
  if (!req.headers.authorization) {
    return res.send({ msg: "no header" });
  }
  token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    payload = verify(token, process.env.JWTSALT);
    user = payload.user_id;
    const collab = await Collaborateur.findOne({ where: { UserId: user } });
    const superadmin = await SuperAdmin.findOne({ where: { UserId: user } });
    if (collab) {
      if (collab.admin) {
        type = "Societe";
      } else {
        type = "Collab";
      }
    } else if (superadmin) {
      type = "Superadmin";
    } else {
      return res.send({
        status: false,
      });
    }
    return res.send({ status: true, type });
  } catch (err) {
    console.log(err);
    return res.send({ status: false, err });
  }
};
