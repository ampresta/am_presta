const Provider = require("../../models/Provider");

module.exports = async (req, res) => {
  const { nom } = req.body;
  if (!nom) {
    return res.sendStatus(404);
  }
  try {
    Provider.create({
      nom,
    });
    return res.send({ status: true, msg: "Nadi" });
  } catch (err) {
    console.log(err);
    return res.send({ status: false });
  }
};
