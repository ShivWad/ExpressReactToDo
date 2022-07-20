module.exports = (sequelize, Sequelize) => {
  const UserData = sequelize.define("userdata", {
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
  return UserData;
};
