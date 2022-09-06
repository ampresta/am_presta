const sequelize = require("sequelize");
const db = require("../../config/database");
const { Cours, Session, Provider, Collaborateur, Proof, Session_Collab } =
  db.models;
module.exports = async (req, res) => {
  const { collabId, coursId } = req.body;
  if (!collabId || !coursId) {
    return res.sendStatus(403);
  }

  const sess = await Session.findAll({
    where: {
      $Collaborateurs$: null,
    },
    include: [
      {
        model: Collaborateur,
        required: false,
        where: {
          id: collabId,
        },
      },
      {
        model: Cours,
        where: {
          id: coursId,
        },
      },
    ],
  });

  return res.send({ status: true, sess });
};
