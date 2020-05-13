module.exports = function (sequelize, DataTypes) {
  const Users = sequelize.define("Users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8]
      }
    },
  });
  Users.associate = function (models) {
    Users.hasMany(models.Posts, {
      foreignKey: {
        allowNull: false
      },
      onDelete: "cascade"
    });
  };
  return Users;
};
