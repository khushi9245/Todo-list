var userRoute = require("./user");
var todoRoute = require("./todo.js");
var adminRoute = require("./admin.js");
module.exports = {
    init: (app) => {
        app.use("/user", userRoute);
        app.use("/todo", todoRoute);
        app.use("/admin", adminRoute);
    },
};