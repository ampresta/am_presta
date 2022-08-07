const db = require("../../config/database");
const User = require("../../models/Users");
const { Provider } = db.models;
module.exports = async (req, res) => {
  const { nom } = req.body;
  if (!nom) {
    return res.sendStatus(404);
  }
  try {
    const provider = await Provider.create({
      nom,
    });
    return res.send({
      status: true,
      msg: "Provider Added",
      id: provider.id,
    });
  } catch (err) {
    console.log(err);
    return res.send({ status: false });
  }
};
