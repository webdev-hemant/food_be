const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const MealLog = sequelize.define("MealLog", {
  id: {
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
  meals: {
    type: DataTypes.JSONB,
    allowNull: false,
    defaultValue: [],
  },
  trackId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: "CalorieMacroTracks",
      key: "trackId",
    },
    onDelete: "CASCADE", // Optional: or CASCADE
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

module.exports = MealLog;
