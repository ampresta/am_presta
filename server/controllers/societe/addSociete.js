const db = require("../../config/database");
const { Societe } = db.models;
module.exports = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.sendStatus(403);
  }
  try {
    await Societe.create({ name });
  } catch (err) {
    console.log(err);
    return res.sendStatus(403);
  }
 
  return res.send({ status: true, msg: "Societe Created Successfully"});
};
