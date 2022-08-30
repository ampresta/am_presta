const sequelize = require("sequelize");
const db = require("../../config/database");

const { Collaborateur, User } = db.models;

module.exports = async (req, res) => {
  const { collab } = req;
  const { nom, prenom, email, username } = req.body;
  if (!nom || !prenom || !email || !username) {
    return res.status(403);
  }
  // try {
  const profile = await Collaborateur.findByPk(collab, {
    include: [
      {
        model: User,
      },
    ],
  });

  const user = await User.findOne({
    include: {
      model: Collaborateur,
      where: {
        id: collab,
      },
    },
  });

  profile.nom = nom;
  profile.prenom = prenom;

  user.email = email;
  user.username = username;

  await profile.save();
  await user.save();

  return res.send(profile);
  // } catch (error) {
  //   console.log(error);
  //   return res.send({ status: false });
  // }
};
