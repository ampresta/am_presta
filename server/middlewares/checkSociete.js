module.exports = async (req, res, next) => {
  console.log("HERERERE");
  req.societe = 1;
  return next();
};
