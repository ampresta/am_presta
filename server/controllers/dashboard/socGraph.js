const sequelize = require("sequelize");
const db = require("../../config/database");
const { Collaborateur, Session_Collab, Proof } = db.models;
module.exports = async (req, res) => {
  const length = 12;
  result = [];
  let filters = {
    raw: true,
    where: {
      SocieteId: req.societe,
    },
    attributes: [
      [sequelize.fn("count", sequelize.col("Collaborateur.id")), "count"],
      [
        db.fn(
          "extract",
          sequelize.literal('month FROM "Collaborateur"."createdAt"')
        ),
        "month",
      ],

      [
        sequelize.fn(
          "extract",
          sequelize.literal('year FROM "Collaborateur"."createdAt"')
        ),
        "year",
      ],
    ],
    group: ["month", "year"],
    order: [sequelize.literal("year"), sequelize.literal("month")],
  };
  for (let index = 0; index < 2; index++) {
    if (index == 1) {
      filters = {
        raw: true,
        where: {
          SocieteId: req.societe,
        },
        include: {
          model: Session_Collab,
          attributes: [],
          required: true,
          include: {
            model: Proof,
            as: "certifs",
            attributes: [],
            where: {
              status: "accepted",
            },
          },
        },
        attributes: [
          [sequelize.fn("count", sequelize.col("Collaborateur.id")), "count"],
          [
            sequelize.fn(
              "extract",
              sequelize.literal(
                'month FROM "Session_Collabs->certifs"."createdAt"'
              )
            ),
            "month",
          ],
          [
            sequelize.fn(
              "extract",
              sequelize.literal(
                'year FROM "Session_Collabs->certifs"."createdAt"'
              )
            ),
            "year",
          ],
        ],
        group: ["month", "year"],
        order: [sequelize.literal("year"), sequelize.literal("month")],
      };
    }
    chart = await Collaborateur.findAll(filters);
    if (chart.length == 0) {
      results = Array(length).fill(0);
    } else {
      const date = Date();
      const new_date = new Date(date);
      final_year = new_date.getFullYear();
      final_month = new_date.getMonth();
      results = [];
      d = chart.slice(-length);
      console.log(d);
      d_length = d.length;
      console.log(d_length);
      m = final_month;
      y = final_year;
      res_index = 1;
      d_index = d.length - 1;
      while (true) {
        val = 0;
        if (m == parseInt(d[d_index].month) && y == parseInt(d[d_index].year)) {
          val = parseInt(d[d_index].count);

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
      }
      // console.log(length, d_length);
      for (i = 0; i < length - d_length; i++) {
        results[i] = 0;
      }
    }
    result.push(results);
  }
  return res.send({
    status: true,
    result,
  });
};
