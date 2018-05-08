module.exports = function(sequelize, DataTypes) {
  var recordset = sequelize.define('recordset', {
    user_id: DataTypes.INTEGER
  });
  recordset.associate = function(models) {
    recordset.hasMany(models.record, {foreignKey: 'rs_id'});
  }
  return recordset;
};
