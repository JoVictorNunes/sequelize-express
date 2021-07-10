"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ServiceOrder extends Model {
    static associate(models) {
      models.ServiceOrder.belongsTo(models.Customer, {
        foreignKey: "fk_id_customer",
      });

      models.ServiceOrder.hasMany(models.Service, {
        foreignKey: "fk_id_service_order",
      });
    }
  }

  ServiceOrder.init(
    {
      // primary key
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // made by Sequelize
        primaryKey: true,
        allowNull: false,
      },

      // foreign key
      fk_id_customer: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Customer",
          key: "id",
        },
      },

      // business attributes
      data_abertura: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,

        validate: {
          isDate: true,
        },
      },
    },
    {
      sequelize,
      modelName: "ServiceOrder",
      paranoid: true,
    }
  );

  return ServiceOrder;
};
