var conn = require("../services/conn.js");
var Admin = require("../models/admin.js");
const env = require('dotenv');
const jwt = require('jsonwebtoken');
env.config();
module.exports = {
  getAll: async () => {
    try {
      return await Admin.findAll({
        where: {
          isdeleted: false,
        },
        include: [
          {
            model: User,
            required: false,
          },
        ],
        attributes: { exclude: ["id"]},
      });
    } catch (error) {
      console.error("Failed to Fetch  record Admin: ", error);
    }
  },
  getOne: async (id) => {
    try {
      return await Admin.findOne({
        where: {
          Adminid: id,
          isdeleted: false,
        },
        include: [
          {
            model: User,
            required: false,
          },
        ],
        attributes: { exclude: ["id"]},
      });
    } catch (error) {
      console.error("Failed to Fetch  record Admin: ", error);
    }
  },
  insert: async (data) => {
    try {
      return await Admin.create(data);
    } catch (error) {
      console.error("Failed to update  record Admin: ", error);
    }
  },
  update: async (id, data) => {
    try {
      return await Admin.update(data, { where: { Adminid: id } });
    } catch (error) {
      console.error("Failed to update  record Admin: ", error);
    }
  },
  delete: async (id) => {
    try {
      return await Admin.update({ isdeleted: true }, { where: { Adminid: id } });
    } catch (error) {
      console.error("Failed to delete  record Admin: ", error);
    }
  },
  login: async (data) => {
    try {
      return await Admin.findOne({
        where: {
          email: data.email,
          password: data.password,
        },
      });
    } catch (error) {
      console.error("Failed to login record Admin:", error);
    }
  },
 
  changepassword: async (data) => {
    try {
      const Admin = await Admin.findOne({
        where: {
          email: data.email,
          password: data.oldpassword,
        },
      });
      if (!Admin) {
        throw new Error("Invalid email or password");
      }
      await Admin.update({ password: data.newpassword });
      return { message: "Password updated successfully" };
    } catch (error) {
      console.error("Failed to change password:", error);
      throw new Error("Failed to change password");
    }
  },

  profile: async (data) => {
    try {
      const Admin = await Admin.findOne({
        where: {
          Adminname:data.Adminname,
          email: data.email,
          contact:data.contact,

        },
      });
      if (!Admin) {
        throw new Error("Invalid email or password");
      }
      await Admin.update({
        Adminname:data.newAdminname,
        email: data.newemail,
        contact:data.newcontact,
         });
      return { message: "Data updated successfully" };
    } catch (error) {
      console.error("Failed to update profile", error);
      throw new Error("Failed to update profile");
    }
  },
  logintoken: async (data) => {
    try {
      const admin = await Admin.findOne({
        where: {
          email: data.email,
          password: data.password,
        },
      });
      let jwtSecretKey = process.env.JWT_SECRET_KEY;
      if (admin) {
        let tokendata = {
          time: Date(),
          adminId: admin.adminid,
          email: admin.email,
          adminname: admin.adminname,
          roleid: admin.roleid
        }
        const token = jwt.sign(tokendata, jwtSecretKey);
       admin.password="";
       return {admin:admin,token:token};
      }
      else {
        return null;
      }
    } catch (error) {
      console.error("Failed to login record Admin:", error);
    }
  },
  checkEmailExists: async (email) => {
    try{
      const existingAdmin = await Admin.findOne({ where: { email: email} });
      return existingAdmin !== null;
    } catch (error) {
      console.error("Failed to check email existance:", error);
      throw new Error("Failed to check email existance");
    }
  }
};
