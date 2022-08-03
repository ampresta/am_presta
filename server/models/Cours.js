const Sequelize = require("sequelize");
const db = require("../config/database");
const Quota = require("./Quota");

const Cours = db.define(
  "Cours",
  {
    // Model attributes are defined here
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nom: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    hooks: {
      beforeCreate: async (cours, options) => {
        if (!cours.image) {
          provider = await Provider.findOne({ id: cours.ProviderId });
          cours.image = provider.image;
        }
      },
    },
  },
  {
    indexes: [
      {
        name: "cours_trigram",
        fields: ["nom"],
        using: "GIN",
        concurrently: true,
        operator: "gin_trgm_ops",
      },
    ],
  },
  {
    Sequelize,
    paranoid: true,
  }
);
Cours.hasMany(Quota);
Quota.hasOne(Cours);
module.exports = Cours;
