const db = require("../../config/database");
const { Voucher, Societe, Provider } = db.models;
module.exports = async (req, res) => {
  const { vouchers } = req.body;
  if (!vouchers) {
    return res.sendStatus(403);
  }
  vouchers.map(async (voucher,index) => {
    const { societe, code, provider } = voucher;
	  if( !societe || ! code || !provider){

		  return res.send({status:false,msg:`Missing Value at ${index}`})
	  }
    try {
      const prov = await Provider.findOne({
        where: { nom: provider },
      });

      const soc = await Societe.findOne({
        where: { name: societe },
      });

      if (prov && soc) {
        await Voucher.create({
          SocieteId: soc.id,
          code: code,
          ProviderId: prov.id,
        });
      } else {
        console.log("no prov or soc");
        return res.send({
          status: false,
          msg: "Provider or Societe Incorrect",
        });
      }
    } catch (err) {
      console.log(err);
      return res.send({ status: false });
    }
  });

  return res.send({ status: true, msg: "Done" });
};
