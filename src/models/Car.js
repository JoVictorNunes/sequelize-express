"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    static associate(models) {
      models.Car.belongsTo(models.Customer, {
        foreignKey: "fk_id_customer",
      });

      models.Car.hasMany(models.Service, {
        foreignKey: "fk_id_car",
      });
    }
  }

  Car.init(
    {
      // primary key
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      // foreign key
      fk_id_customer: {
        type: DataTypes.UUID,
        references: {
          model: "Customer",
          key: "id",
        },
      },

      // business attributes
      fabricante: {
        type: DataTypes.STRING(20),
        allowNull: false,

        set(rawValue) {
          const value = rawValue.trim().toUpperCase();
          this.setDataValue("fabricante", value);
        },

        validate: {
          is: /^[A-Z0-9-]{2,20}$/,
        },
      },

      modelo: {
        type: DataTypes.STRING(20),
        allowNull: false,

        set(rawValue) {
          const value = rawValue.trim().toUpperCase();
          this.setDataValue("modelo", value);
        },

        validate: {
          is: /^[A-Z0-9-]{2,20}$/,
        },
      },

      placa: {
        type: DataTypes.CHAR(7),
        unique: true,
        allowNull: false,

        set(rawValue) {
          const value = rawValue.toUpperCase();
          this.setDataValue("placa", value);
        },

        validate: {
          is: /^[A-Z]{3}[0-9]{4}$/,
        },
      },

      ano_lancamento: {
        type: DataTypes.CHAR(4),

        set(rawValue) {
          this.setDataValue("ano_lancamento", String(rawValue));
        },

        validadate: {
          is: /^[0-9]{4}$/,
        },
      },
    },
    {
      sequelize,
      modelName: "Car",
      paranoid: true,
    }
  );

  return Car;
};
