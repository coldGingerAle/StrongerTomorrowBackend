module.exports = function(sequelize, DataTypes) {
  var scholarship_requirements = sequelize.define('scholarship_requirements', {
    value: DataTypes.INTEGER,
    operation: DataTypes.INTEGER,
    req_id: DataTypes.INTEGER,
    sc_id: DataTypes.INTEGER
  });
  return scholarship_requirements;
};
