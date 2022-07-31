const Provider = require("../../models/Provider");

module.exports = async (req, res) => {
  const prviders = await Provider.findAll({}); // Implementing search
  return res.json(prviders);
};
