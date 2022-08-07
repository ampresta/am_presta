module.exports = (db) => {
  // Session Collab
  const {
    Request,
    ChallengeCollab,
    Session,
    Session_Collab,
    Collaborateur,
    Societe,
    Departement,
    Quota,
    Provider,
    User,
    Challenge,
    Cours,
    SuperAdmin,
  } = db.models;
  Session.belongsToMany(Collaborateur, {
    through: Session_Collab,
  });
  Collaborateur.belongsToMany(Session, {
    through: Session_Collab,
  });
  // Departement Collab
  Departement.hasMany(Collaborateur);
  Collaborateur.belongsTo(Departement);
  // Societe Departement
  Societe.hasMany(Departement);
  Departement.belongsTo(Societe);
  //Societe Collab
  Societe.hasMany(Collaborateur);
  Collaborateur.Societe = Collaborateur.belongsTo(Societe);
  // Societe Quota
  Societe.hasMany(Quota);
  Quota.belongsTo(Societe);
  // User Collab
  User.Collaborateur = User.hasOne(Collaborateur);
  Collaborateur.belongsTo(User);
  // Challenge Collab
  Challenge.belongsToMany(Collaborateur, { through: ChallengeCollab });
  Collaborateur.belongsToMany(Challenge, { through: ChallengeCollab });
  // Challenge Session
  Challenge.belongsToMany(Session, { through: "ChallengeSession" });
  Session.belongsToMany(Challenge, { through: "ChallengeSession" });
  //Challenge Departement
  Challenge.belongsToMany(Departement, { through: "Challenge_Dept" });
  Departement.belongsToMany(Challenge, { through: "Challenge_Dept" });
  // Provider Cours
  Provider.Cours = Provider.hasMany(Cours);
  Cours.Provider = Cours.belongsTo(Provider);
  // Cours Quota
  Provider.hasMany(Quota);
  Quota.belongsTo(Provider);
  // Session Cours
  Session.belongsTo(Cours);
  Cours.hasMany(Session);
  // Session Societe
  Session.belongsTo(Societe);
  Societe.hasMany(Session);
  // SuperAdmin User
  SuperAdmin.User = SuperAdmin.belongsTo(User);
  User.SuperAdmin = User.hasOne(SuperAdmin);
  // Requests
  Collaborateur.belongsToMany(Cours, { through: Request });
  Cours.belongsToMany(Collaborateur, { through: Request });
  Collaborateur.hasMany(Request);
  Request.belongsTo(Collaborateur);
  Cours.hasMany(Request);
  Request.belongsTo(Cours);
};
