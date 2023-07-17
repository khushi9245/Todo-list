var express = require("express");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var admin = require("../services/admin.js");
var router = express.Router();
router.get("/", async function (req, res) {
  console.log("GetAll");
  console.log(JSON.stringify(await admin.getAll()));
  res.send(JSON.stringify(await admin.getAll()));
});
router.get("/:id", async function (req, res) {
  res.send(JSON.stringify(await admin.getOne(req.params.id)));
});
router.get("/check-email/:email", async function (req, res) {
  try{
    const emailExists = await admin.checkEmailExists(req.params.email);
    res.send({exists: emailExists});
  } catch (error) {
    console.error("Failed to check email existence:", error);
    res.status(500).json({message: 'Failed to check email existance'});
  }
});
router.post("/", async function (req, res) {
  res.send(JSON.stringify(await admin.insert(req.body)));
});
router.post("/login/", async function (req, res) {
  res.send(JSON.stringify(await admin.login(req.body)));
});

router.delete("/:id", async function (req, res) {
  res.send(JSON.stringify(await admin.delete(req.params.id)));
});
router.put("/:id", async function (req, res) {
  res.send(JSON.stringify(await admin.update(req.params.id, req.body)));
});
router.post("/logintoken/", async (req, res) => {
  res.send(await admin.logintoken(req.body));
});
router.post("/changepassword", async (req, res) => {
  try {
    const result = await admin.changepassword(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to change password' });
  }
});
router.post("/profile", async (req, res) => {
  try {
    const result = await admin.profile(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

module.exports = router;
