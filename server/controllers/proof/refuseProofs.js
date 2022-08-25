const db = require("../../config/database");
const { Proof } = db.models;
module.exports = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.sendStatus(403);
  }

  try {
    const proof = await Proof.findOne({
      where: { id },
    });
    proof.status = "refused";

    await proof.save();
    return res.send({ status: true, msg: "Done" });
  } catch (err) {
    return res.send({ status: false });
  }
};
