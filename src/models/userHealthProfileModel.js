const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const UserHealthProfile = sequelize.define(
  "UserHealthProfile",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true, // One-to-one relationship with User
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: { min: 0 },
    },
    gender: {
      type: DataTypes.STRING, // Changed from ENUM to STRING
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    activityLevel: {
      type: DataTypes.STRING, // Changed from ENUM to STRING
      allowNull: true,
    },
    healthGoal: {
      type: DataTypes.STRING, // Changed from ENUM to STRING
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = UserHealthProfile;