module.exports = function(sequelize, DataTypes) {
  var record = sequelize.define('record', {
    rs_id: DataTypes.INTEGER,
    req_id: DataTypes.INTEGER,
    value: DataTypes.STRING
  });
  record.associate = function(models) {
    record.belongsTo(models.record, {foreignKey: 'rs_id'});
  }
  return record;
};
