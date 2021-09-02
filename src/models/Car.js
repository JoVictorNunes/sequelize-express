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
      brand: {
        type: DataTypes.STRING(20),
        allowNull: false,

        set(rawValue) {
          const value = rawValue.trim().toUpperCase();
          this.setDataValue("brand", value);
        },

        validate: {
          is: /^[A-Z0-9-]{2,20}$/,
        },
      },

      model: {
        type: DataTypes.STRING(20),
        allowNull: false,

        set(rawValue) {
          const value = rawValue.trim().toUpperCase();
          this.setDataValue("model", value);
        },

        validate: {
          is: /^[A-Z0-9-]{2,20}$/,
        },
      },

      license: {
        type: DataTypes.CHAR(7),
        unique: true,
        allowNull: false,

        set(rawValue) {
          const value = rawValue.toUpperCase();
          this.setDataValue("license", value);
        },

        validate: {
          is: /^[A-Z]{3}[0-9]{4}$/,
        },
      },

      year: {
        type: DataTypes.CHAR(4),

        set(rawValue) {
          this.setDataValue("year", String(rawValue));
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
