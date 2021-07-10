"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      models.Customer.hasMany(models.Car, {
        foreignKey: "fk_id_customer",
      });
      models.Customer.hasMany(models.Phone, {
        foreignKey: "fk_id_customer",
      });
      models.Customer.hasMany(models.ServiceOrder, {
        foreignKey: "fk_id_customer",
      });
    }
  }

  function formatCPF(cpf) {
    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 12)}`;
  }

  Customer.init(
    {
      // primary key
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // made by Sequelize
        primaryKey: true,
        allowNull: false,
      },

      // business attributes
      nome: {
        type: DataTypes.STRING(20),
        allowNull: false,

        get() {
          const rawValue = this.getDataValue("nome");
          // TODO:
          return rawValue;
        },

        set(value) {
          this.setDataValue("nome", value.trim().toLowerCase());
        },

        validate: {
          notEmpty: {
            msg: "O nome é realmente necessário!",
          },
          notNull: {
            msg: "O nome é realmente necessário!",
          },

          // custom validation
          isObscene(value) {
            if (value.includes("fuck")) {
              throw new Error("This not cool, dude!");
            }
          },
        },
      },
      cpf: {
        type: DataTypes.STRING(11),
        unique: true,

        get() {
          const rawValue = this.getDataValue("cpf");
          return formatCPF(rawValue);
        },

        set(rawValue) {
          const value = rawValue.replaceAll(".", "").replaceAll("-", "");
          this.setDataValue("cpf", value);
        },

        validate: {
          isNumeric: true,
          notEmpty: {
            msg: "Strings vazias não são permitidas",
          },
          len: [11, 11],
        },
      },
      header: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.nome} - ${this.cpf}`;
        },
        set() {
          throw new Error("Don't set header value!");
        },
      },
    },
    {
      sequelize,
      modelName: "Customer",
      paranoid: true,
    }
  );

  return Customer;
};
