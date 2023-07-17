const { DataTypes } = require("sequelize");
var conn = require("../services/conn.js");

const User = conn.define("tblUsers", {
  userid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  contact: { type: DataTypes.BIGINT, allowNull: true },
  isdeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});
module.exports = User;
