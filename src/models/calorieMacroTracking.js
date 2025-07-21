const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const CalorieMacroTrack = sequelize.define("CalorieMacroTrack", {
  trackId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  calories: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  protein: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  carbs: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  fat: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  fiber: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  water: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ["userId", "date"],
    },
  ],
});

module.exports = CalorieMacroTrack;
