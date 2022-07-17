module.exports = (sequelize, Sequelize) => {
  const Pr = sequelize.define("pr", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Pr;
};
