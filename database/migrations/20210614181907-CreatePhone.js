"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Phone", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      fk_id_customer: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Customer",
          key: "id",
        },
      },
      number: {
        type: Sequelize.STRING(11),
        unique: true,
        allowNull: false,
      },
      kind: {
        type: Sequelize.ENUM("tel", "cel", "com"),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Phone");
  },
};
