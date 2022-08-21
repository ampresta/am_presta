module.exports = (req, res) => {
  res.clearCookie(
    "jbid",

    {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    }
  );
  return res.send({ status: true });
};
