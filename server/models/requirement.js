module.exports = function(sequelize, DataTypes) {
  var requirement = sequelize.define('requirement', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    type: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  requirement.associate = function(models) {
    requirement.belongsToMany(models.scholarship, {through: models.scholarship_requirements, foreignKey: 'req_id'});
  }
  return requirement;
};
