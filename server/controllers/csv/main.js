const Collaborateur = require("../../models/Collaborateur");
const { fields } = require("../../models/Collaborateur");

module.exports = (req, res) => {

  return res.send({ msg: "done" });
};
