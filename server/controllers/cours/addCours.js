Cours = require("../../models/Cours");
module.exports = async (req, res) => {
  cours = req.body["nom"];
  provider = req.body["provider"];
  description = req.body["description"];
  if (!cours || !provider || !description) {
    return res.sendStatus(403);
  }
  try {
    Cours.create({
      nom: cours,
      provider: provider,
      description: description,
    });
    return res.json({ status: "done" });
  } catch (err) {
    return res.send({ status: "error", err: err }); 
  }
};
