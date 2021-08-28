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

  function formatPhone(rawValue) {
    return `(${rawValue.substring(0, 2)}) ${rawValue.substring(2, 7)}-${rawValue.substring(7, 11)}`;
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

        get() {
          const rawValue = this.getDataValue("numero");
          return formatPhone(rawValue);
        },

        set(rawValue) {
          const value = rawValue
            .replaceAll("(", "")
            .replaceAll(")", "")
            .replaceAll(" ", "")
            .replaceAll("-", "");

          this.setDataValue("numero", value);
        },

        validate: {
          is: /^[0-9]{11}$/,
        },
      },
      tipo: {
        type: DataTypes.ENUM("tel", "cel", "com"),

        set(rawValue) {
          const value = rawValue.toLowerCase();
          this.setDataValue("tipo", value);
        },

        validate: {
          isIn: [["tel", "cel", "com"]],
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
