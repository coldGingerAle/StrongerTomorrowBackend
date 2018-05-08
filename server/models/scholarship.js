module.exports = function(sequelize, DataTypes) {
  var scholarship = sequelize.define('scholarship', {
    name: DataTypes.STRING
  });

  scholarship.associate = function(models) {
    scholarship.belongsToMany(models.requirement, {through: models.scholarship_requirements, foreignKey: 'sc_id'});
  }
  return scholarship;
};
