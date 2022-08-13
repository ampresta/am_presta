const db = require("../../config/database");
const { Societe, Collaborateur } = db.models;
module.exports = async (req, res) => {
  companies = await Collaborateur.findAll({
    limit: 3,
    order: ["createdAt"],
    where:{
	    SocieteId:req.societe
    },
	  include: {
      model: Collaborateur,
      attributes: ["nom", "prenom"],
      where: {
        : true,
      },
    },
  });
  return res.send({
    companies,
  });
};
