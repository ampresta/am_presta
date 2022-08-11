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
    Proof,
  } = db.models;

  // Session Collabs
  Session.belongsToMany(Collaborateur, {
    through: Session_Collab,
  });
  Collaborateur.belongsToMany(Session, {
    through: Session_Collab,
  });
  // Session_Collab Proof
  Session_Collab.hasMany(Proof);
  Proof.belongsTo(Session_Collab, { as: "certifs" });
  Session_Collab.hasMany(Proof);
  Proof.belongsTo(Session_Collab, { as: "fincourse" });
  // Departement Collab
  Departement.hasMany(Collaborateur);
  Collaborateur.belongsTo(Departement);
  // Societe Departement
  Societe.hasMany(Departement, {
    onDelete: "CASCADE",
  });
  Departement.belongsTo(Societe);
  //Societe Collab
  Societe.hasMany(Collaborateur, {
    onDelete: "CASCADE",
  });
  Collaborateur.Societe = Collaborateur.belongsTo(Societe);
  // Societe Quota
  Societe.hasMany(Quota);
  Quota.belongsTo(Societe);
  // User Collab
  User.Collaborateur = User.hasOne(Collaborateur, {
    onDelete: "CASCADE",
  });
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
  Provider.Cours = Provider.hasMany(Cours, {
    onDelete: "CASCADE",
  });
  Cours.Provider = Cours.belongsTo(Provider);
  // Cours Quota
  Provider.hasMany(Quota, {
    onDelete: "CASCADE",
  });
  Quota.belongsTo(Provider);
  // Session Cours
  Session.belongsTo(Cours);
  Cours.hasMany(Session, {
    onDelete: "CASCADE",
  });
  // Session Societe
  Session.belongsTo(Societe);
  Societe.hasMany(Session, {
    onDelete: "CASCADE",
  });
  // SuperAdmin User
  SuperAdmin.User = SuperAdmin.belongsTo(User);
  User.SuperAdmin = User.hasOne(SuperAdmin);
  // Requests
  Collaborateur.belongsToMany(Cours, { through: Request });
  Cours.belongsToMany(Collaborateur, { through: Request });
  Collaborateur.hasMany(Request, {
    onDelete: "CASCADE",
  });
  Request.belongsTo(Collaborateur);
  Cours.hasMany(Request, {
    onDelete: "CASCADE",
  });
  Request.belongsTo(Cours);
};
