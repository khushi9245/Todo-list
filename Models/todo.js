const { DataTypes } = require("sequelize");
var conn = require("../services/conn.js");

const tblTodo = conn.define("tblTODO", {
  todoid: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userid: { type: DataTypes.INTEGER, allowNull: false},
  date: { type: DataTypes.DATEONLY, allowNull: false, defaultValue: DataTypes.NOW },
  title: { type: DataTypes.STRING, allowNull: false},
  task: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false }, 
  isfavourite: { type: DataTypes.BOOLEAN, allowNull:false, defaultValue: false},
  isdeleted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
});
module.exports = tblTodo;