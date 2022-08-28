module.exports = async (req, res) => {
  console.log("worked");
  return res.send({ status: true, message: "it works" });
};
