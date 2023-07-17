const { Op } = require('sequelize');
const User = require("../models/user.js");
const tbltodos = require("../models/todo.js");
tbltodos.belongsTo(User, { foreignKey: "userid" });
var conn = require("../services/conn.js");
var Todo = require("../models/todo.js");
module.exports = {
    getAll: async () => {
        try {
            return await Todo.findAll({
                where: {
                    isdeleted: false,
                },
                include: [
                    {
                        model: User,
                        required: false,
                    },

                ],
                attributes: { exclude: ["id"] },

            });
        } catch (error) {
            console.error("Failed to Fetch  record Todo: ", error);
        }
    },
    getAllByUserId: async (userId) => {
        try {
            return await Todo.findAll({
                where: {
                    userid: userId,
                    isdeleted: false,
                },
                include: [
                    {
                        model: User,
                        required: false,
                    },

                ],
                attributes: { exclude: ["id"] },
            });
        } catch (error) {
            console.error("Failed to Fetch record Todo: ", error);
        }
    },
    getOne: async (id) => {
        try {
            return await Todo.findOne({
                where: {
                    Todoid: id,
                    isdeleted: false,
                },
                include: [
                    {
                        model: User,
                        required: false,
                    },

                ],
                attributes: { exclude: ["id"] },

            });
        } catch (error) {
            console.error("Failed to Fetch  record Todo: ", error);
        }
    },
    insert: async (data) => {
        try {
            return await Todo.create(data);
        } catch (error) {
            console.error("Failed to update  record Todo: ", error);
        }
    },
    update: async (id, data) => {
        try {
            return await Todo.update(data, { where: { Todoid: id } });
        } catch (error) {
            console.error("Failed to update  record Todo: ", error);
        }
    },
    delete: async (id) => {
        try {
            return await Todo.update({ isdeleted: true }, { where: { Todoid: id } });
        } catch (error) {
            console.error("Failed to delete  record Todo: ", error);
        }
    },
    favourite: async (id) => {
        try {
            const todo = await Todo.update({ where: { Todoid: id } });
            todo.isFavorite = !todo.isFavorite;
            await todo.save();
            return todo;
        } catch (error) {
            console.error("Failed to toggle favorite status for Todo: ", error);
        }
    },   

    


    sort: async (userId) => {
        try {
            return await Todo.findAll({
                where: {
                    userid: userId,
                    isdeleted: false,
                },
                include: [
                    {
                        model: User,
                        required: false,
                    },

                ],
                attributes: { exclude: ["id"] },
            });
        } catch (error) {
            console.error("Failed to Fetch record Todo: ", error);
        }
    },
};
