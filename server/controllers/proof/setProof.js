const db = require("../../config/database");
const { Session_Collab, Proof } = db.models;
module.exports = async (req, res) => {
  const { sess, type } = req.body;
  const { collab } = req
  
  if (!sess || !collab || !type) {
    return res.sendStatus(403);
  }

  try {
    const sess_collab = await Session_Collab.findOne({
      where: { SessionId: sess, CollaborateurId: collab },
      include: [
        {
          model: Proof,
          as: "certifs",
        },
        {
          model: Proof,
          as: "fincourse",
        },
      ],
    });
    if (type === "fincourse") {
      console.log("\x1b[41mLOG:\x1b[0m");
      console.log(sess_collab);
      if (!sess_collab.fincourse) {
        const proof = await Proof.create({
          status: false,
          name: req.file.filename,
          mimetype: req.file.mimetype,
          size: req.file.size,
          file: req.file.path,
        });
        sess_collab.fincourseId = proof.id;
      } else {
        sess_collab.fincourse.file = req.file.path;
        sess_collab.fincourse.mimetype = req.file.mimetype;
        sess_collab.fincourse.size = req.file.size;
        sess_collab.fincourse.name = req.file.filename;
      }
    } else if (type === "certifs") {
      if (!sess_collab.certifs) {
        const proof = await Proof.create({
          status: false,
          name: req.file.filename,
          mimetype: req.file.mimetype,
          size: req.file.size,
          file: req.file.path,
        });
        sess_collab.certifsId = proof.id;
      } else {
        sess_collab.certifs.file = req.file.path;
        sess_collab.certifs.mimetype = req.file.mimetype;
        sess_collab.certifs.size = req.file.size;
        sess_collab.certifs.name = req.file.filename;
      }
    }
    await sess_collab.save();
    return res.send({ status: true, go: req.file.path });
  } catch (err) {
    console.log("\x1b[41mERROR:\x1b[0m");
    console.log(err);
    return res.send({ status: false });
  }
};
