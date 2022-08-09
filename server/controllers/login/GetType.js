const db = require("../../config/database");
const { SuperAdmin, Collaborateur } = db.models;
module.exports = async (user) => {
  const collab = await Collaborateur.findOne({ where: { UserId: user.id } });
  const superadmin = await SuperAdmin.findOne({ where: { UserId: user.id } });
  if (collab) {
    if (collab.admin) {
      type = "Societe";
    } else {
      type = "Collab";
    }
    return type;
  } else if (superadmin) {
    return "Superadmin";
  } else {
    return "Error";
  }
};
