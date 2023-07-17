const { DataTypes } = require("sequelize");
var conn = require("../services/conn.js");

const Role = conn.define("tblroles", {
  roleid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  role: { type: DataTypes.STRING, allowNull: false },
});
module.exports = Role;
