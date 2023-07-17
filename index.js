var express = require("express");
var cors = require("cors");
var env = require("dotenv");
var routes = require("./routes/index.js");
var conn = require("./services/conn.js");
var Models = require("./models/index.js");

var app = express();
app.use(cors());
app.use(express.json());
routes.init(app);
app.get("/", function (req, res) {
  res.send("Api Launched");
});
conn
  .sync()
  .then(() => {
    console.log(" table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table : ", error);
  });
app.listen(9090);
console.log("Server running at http://127.0.0.1:9090/");
