const argon2 = require("argon2");
User = require("../../models/Users");
module.exports = async (req, res) => {
  if (req.method == "POST") {
    user = req.body["username"];
    password = req.body["password"];
    pep = process.env.PEPPER;
    try {
      const hash = await argon2.hash(password + pep);
      await User.create({ username: user, password: hash });
      return res.send("Done");

    } catch (err) {
      return res.send("error hashing " + err);
    }
  }
  return res.send("NOT POST");
};
