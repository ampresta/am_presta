Cours = require("../../models/Cours");
module.exports = async (req, res) => {
  cours = req.body["name"];
  provider = req.body["provider"];
  description = req.body["description"];
  if (!cours || !provider || !description) {
    return res.sendStatus(403);
  }
  try {
    Cours.create({
      name: cours,
      provider: provider,
      description: description,
    });
    return res.send("Done");
  } catch {
    return res.sendStatus(403);
  }
};
