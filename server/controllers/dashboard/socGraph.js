const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Session_Collab, Proof } = db.models;
module.exports = async (req, res) => {
  result = [];
  filters = {
    attributes: [
      [db.fn("count", db.col("id")), "count"],
      [db.fn("extract", sequelize.literal('month FROM "createdAt"')), "month"],

      [db.fn("extract", sequelize.literal('year FROM "createdAt"')), "year"],
    ],
    group: ["month", "year"],
    order: [sequelize.literal("year"), sequelize.literal("month")],
  };
  for (let index = 0; index < 2; index++) {
    if (index == 1) {
      filters.include = {
        model: Session_Collab,
        include: Proof,
        as: "certifs",
        where: {
          status: true,
        },
      };
    }
    chart = await Collaborateur.findAll(filters);
    if (chart.length == 0) {
      results = Array(length).fill(0);
    } else {
      final_year = chart.at(-1).dataValues.year;
      final_month = chart.at(-1).dataValues.month;
      results = [];
      d = chart.slice(-length);
      d_length = d.length;
      m = final_month;
      y = final_year;
      res_index = 1;
      d_index = d.length - 1;
      while (true) {
        val = 0;
        ex = false;
        if (
          m == parseInt(d[d_index].dataValues.month) &&
          y == parseInt(d[d_index].dataValues.year)
        ) {
          val = parseInt(d[d_index].dataValues.count);

          d_index--;
          console.log(d_index);
          if (d_index < -1) {
            break;
          }
        }
        results[length - res_index] = val;
        res_index++;
        // console.log(res_index);
        if (res_index == d_length + 1) {
          break;
        }
        m--;
        if (m == 0) {
          m = 12;
          y--;
        }

        if (ex) {
          break;
        }
      }
      // console.log(length, d_length);
      for (i = 0; i < length - d_length; i++) {
        results[i] = 0;
      }
    }
    result.push(results[i]);
  }
  return res.send({
    result,
  });
};
