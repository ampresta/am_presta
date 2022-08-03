const Sequelize = require("sequelize");
const db = require("../config/database");
const Provider = require("./Provider");
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
          provider = await Provider.findOne({
            where: { id: cours.ProviderId },
          });

          cours.image = provider.image;
          console.log("HEEEEEEELP");
          console.log(cours.image);
          console.log(provider);
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

Provider.Cours = Provider.hasMany(Cours);
Cours.Provider = Cours.belongsTo(Provider);

Cours.hasMany(Quota);
Quota.hasOne(Cours);
module.exports = Cours;
