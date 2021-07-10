"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Car", {
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
      fabricante: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      modelo: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      placa: {
        type: Sequelize.STRING(7),
        unique: true,
        allowNull: false,
      },
      ano_lancamento: {
        type: Sequelize.CHAR(4),
        allowNull: false,
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
    await queryInterface.dropTable("Car");
  },
};
