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
          const value = rawValue.trim().toLowerCase();
          this.setDataValue("fabricante", value);
        },

        validate: {
          notNull: {
            msg: "O fabricante deve ser fornecido!",
          },
          notEmpty: {
            msg: "O fabricante deve ser fornecido!",
          },
        },
      },

      modelo: {
        type: DataTypes.STRING(20),
        allowNull: false,

        set(rawValue) {
          const value = rawValue.trim().toLowerCase();
          this.setDataValue("modelo", value);
        },

        validate: {
          notNull: {
            msg: "O modelo deve ser fornecido!",
          },
          notEmpty: {
            msg: "O modelo deve ser fornecido!",
          },
        },
      },

      placa: {
        type: DataTypes.STRING(7),
        unique: true,
        allowNull: false,

        set(rawValue) {
          const value = rawValue
            .trim()
            .toUpperCase()
            .replaceAll(".", "")
            .replaceAll(" ", "")
            .replaceAll("-", "");

          this.setDataValue("placa", value);
        },

        validate: {
          isAlphanumeric: true,
          notNull: {
            msg: "A placa deve ser fornecida!",
          },
          notEmpty: {
            msg: "A placa deve ser fornecida!",
          },
          len: [7, 7],
        },
      },

      ano_lancamento: {
        type: DataTypes.CHAR(4),

        set(rawValue) {
          const value = rawValue.replaceAll(" ", "");
          this.setDataValue("ano_lancamento", value);
        },

        validadate: {
          isNumeric: true,
          notEmpty: {
            msg: "Strings vazias não são permitidas!",
          },
          len: [4, 4],
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
