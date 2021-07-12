"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      models.Service.belongsTo(models.ServiceOrder, {
        foreignKey: "fk_id_service_order",
      });

      models.Service.belongsTo(models.Car, {
        foreignKey: "fk_id_car",
      });
    }
  }

  Service.init(
    {
      // primary key
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // made by Sequelize
        primaryKey: true,
        allowNull: false,
      },

      // foreing keys
      fk_id_service_order: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "ServiceOrder",
          key: "id",
        },
      },
      fk_id_car: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Car",
          key: "id",
        },
      },

      // business attributes
      descricao: {
        type: DataTypes.STRING(150),
        allowNull: false,

        validate: {
          len: {
            msg: "Comprimento de string não permitido!",
            args: [1, 150]
          }
        },
      },
      valor: {
        type: DataTypes.FLOAT(7, 2),
        allowNull: false,

        validate: {
          isFloat: true,
          notNull: true,
        },
      },
      status: {
        type: DataTypes.ENUM("Em Espera", "Em Andamento", "Concluído"),
        allowNull: false,

        validate: {
          isIn: [["Em Espera", "Em Andamento", "Concluído"]]
        },
      },
    },
    {
      sequelize,
      modelName: "Service",
      paranoid: true,
    }
  );

  return Service;
};
