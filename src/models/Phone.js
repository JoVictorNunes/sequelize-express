"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    static associate(models) {
      models.Phone.belongsTo(models.Customer, {
        foreignKey: "fk_id_customer",
      });
    }
  }

  Phone.init(
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
      numero: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false,

        set(rawValue) {
          const value = rawValue
            .trim()
            .toLowerCase()
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll(" ", "")
            .replaceAll("-", "");

          this.setDataValue("numero", value);
        },

        validate: {
          isNumeric: true,
          notNull: {
            msg: "O número é necessário.",
          },
          notEmpty: {
            msg: "O número é necessário.",
          },
        },
      },
      tipo: {
        type: DataTypes.ENUM("tel", "cel", "com"),

        set(rawValue) {
          const value = rawValue.trim().toLowerCase();
          this.setDataValue("tipo", value);
        },

        validate: {
          isIn: [["tel", "cel", "com"]],
          isAlpha: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Phone",
      paranoid: true,
    }
  );

  return Phone;
};
