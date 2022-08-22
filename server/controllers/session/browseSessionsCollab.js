const sequelize = require("sequelize");
const db = require("../../config/database");
const { Cours, Session, Provider, Collaborateur, Proof, Session_Collab } =
  db.models;
module.exports = async (req, res) => {
  const { collab } = req;
  let filters = {};
  filters.include = [
    {
      model: Session_Collab,
      attributes: [],
      include: [
        {
          model: Proof,
          attributes: [],
          as: "certifs",
          required: false,
          where: {
            status: true,
          },
        },
        {
          model: Collaborateur,
          attributes: [],
          where: {
            admin: false,
            instructor: false,
          },
        },
      ],
      where: { CollaborateurId: collab },
    },
  ];

  filters.group = ["Session.id", "Cour.id", "Cour->Provider.id"];
  filters.include.push({
    model: Cours,
    required: true,
    attributes: ["id", "image", "nom"],
    include: {
      model: Provider,
      attributes: ["nom"],
    },
  });
  try {
    const sessions = await Session.findAll(filters);
    return res.send(sessions);
  } catch (err) {
    console.log(err);
    return res.send({ status: "error" });
  }
};
