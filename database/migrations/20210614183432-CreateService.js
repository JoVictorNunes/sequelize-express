"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Service", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
      },
      fk_id_service_order: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "ServiceOrder",
          key: "id",
        },
      },
      fk_id_car: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Car",
          key: "id",
        },
      },
      descricao: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      valor: {
        type: Sequelize.FLOAT(7, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("Em Espera", "Em Andamento", "Concluído"),
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
    await queryInterface.dropTable("Service");
  },
};
