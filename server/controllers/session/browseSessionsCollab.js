const sequelize = require("sequelize");
const db = require("../../config/database");
const {Voucher, Cours, Session, Provider, Collaborateur, Proof, Session_Collab } =
  db.models;
module.exports = async (req, res) => {
  const { collab } = req;
  let filters = {};
  filters.include = [
    {
      model: Collaborateur,
      through: {
        attributes: [],
      },
      attributes: [],
      where: {
        admin: false,
        instructor: false,
      },
    },
    {
      model: Session_Collab,
      attributes: ["id"],
      include: [
        {
          model: Proof,
          // attributes: [],
          as: "certifs",
          required: false,
        },
        {
          model: Proof,
          // attributes: [],
          as: "fincourse",
          required: false,
        },
	{
	  model:Voucher,
       	  attributes:["id"],
 	 }
      ],
      where: { CollaborateurId: collab },
    },
  ];

  filters.attributes = {
    include: [
      [sequelize.fn("count", sequelize.col("Collaborateurs.id")), "collabs"],
    ],
  };
  filters.group = [
    "Session_Collabs.id",
    "Session_Collabs->fincourse.id",
    "Session_Collabs->certifs.id",
    "Session_Collabs->Voucher.id",
    "Session.id",
    "Cour.id",
    "Cour->Provider.id",
  ];
  filters.include.push({
    model: Cours,
    required: true,
    attributes: ["id", "image", "nom"],
    include: {
      model: Provider,
	    required:true,
      attributes: ["nom"],
    },
  });
  try {
    const sessions = await Session.findAll(filters);
    return res.send(sessions);
  } catch (err) {
    console.log(err);
    return res.send({ status: false });
  }
};
