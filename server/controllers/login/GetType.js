const Collaborateur = require("../../models/Collaborateur");
const SuperAdmin = require("../../models/SuperAdmin");

module.exports = async (user) => {
  const collab = await Collaborateur.findOne({ UserId: user.id });
  const superadmin = await SuperAdmin.findOne({ UserId: user.id });
  if (collab) {
    return "collab";
  } else if (superadmin) {
    return "superadmin";
  } else {
    return "Error";
  }
};
