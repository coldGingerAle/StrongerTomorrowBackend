'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('scholarship_requirements', {
      value: {
        type: Sequelize.INTEGER
      },
      operation: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      sc_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      req_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('scholarship_requirements');
  }
};
