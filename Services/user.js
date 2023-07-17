var conn = require("../services/conn.js");
var User = require("../models/user.js");
const env = require('dotenv');
const jwt = require('jsonwebtoken');
env.config();
module.exports = {
  getAll: async () => {
    try {
      return await User.findAll({
        where: {
          isdeleted: false,
        },
      });
    } catch (error) {
      console.error("Failed to Fetch  record User: ", error);
    }
  },
  getOne: async (id) => {
    try {
      return await User.findOne({
        where: {
          userid: id,
          isdeleted: false,
        },
      });
    } catch (error) {
      console.error("Failed to Fetch  record User: ", error);
    }
  },
  insert: async (data) => {
    try {
      return await User.create(data);
    } catch (error) {
      console.error("Failed to update  record User: ", error);
    }
  },
  update: async (id, data) => {
    try {
      return await User.update(data, { where: { userid: id } });
    } catch (error) {
      console.error("Failed to update  record User: ", error);
    }
  },
  delete: async (id) => {
    try {
      return await User.update({ isdeleted: true }, { where: { userid: id } });
    } catch (error) {
      console.error("Failed to delete  record User: ", error);
    }
  },
  login: async (data) => {
    try {
      return await User.findOne({
        where: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      console.error("Failed to login record User:", error);
    }
  },
  logintoken: async (data) => {
    try {
      const user = await User.findOne({
        where: {
          email: data.email,
          password: data.password,
        },
      });
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      if (user) {
        let tokendata = {
          time: Date(),
          userId: user.userid,
          email: user.email,
          username: user.username,
          roleid: user.roleid
        }
        const token = jwt.sign(tokendata, jwtSecretKey);
       user.password="";
       return {user:user,token:token};
      }
      else {
        return null;
      }
    } catch (error) {
      console.error("Failed to login record User:", error);
    }
  },
};
