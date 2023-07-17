var express = require("express");
var  Todo = require("../services/todo.js");
var router = express.Router();
const env = require("dotenv");
env.config();
const jwt = require("jsonwebtoken") 
router.get("/", async function (req, res) {
  console.log(req.header("authorization"));
  try {
    if (
      jwt.verify(
        req.header("authorization").substring(7),
        process.env.JWT_SECRET_KEY
      )
    ) {
      console.log(jwt.decode(req.header("authorization").substring(7)));
      res.send(JSON.stringify(await Todo.getAll()));
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
});
router.get("/user/:userId", async function (req, res) {
    console.log(req.header("authorization"));
    try {
      if (
        jwt.verify(
          req.header("authorization").substring(7),
          process.env.JWT_SECRET_KEY
        )
      ) {
        console.log(jwt.decode(req.header("authorization").substring(7)));
        res.send(JSON.stringify(await Todo.getAllByUserId(req.params.userId)));
      } else {
        // Access Denied
        return res.status(401).send(error);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send(error);
    }
  });

router.get("/:id", async function (req, res) {
  console.log(req.header("authorization"));
  try {
    if (
      jwt.verify(
        req.header("authorization").substring(7),
        process.env.JWT_SECRET_KEY
      )
    ) {
      console.log(jwt.decode(req.header("authorization").substring(7)));
      res.send(JSON.stringify(await Todo.getOne(req.params.id)));
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
});
router.post("/", async function (req, res) {
  console.log(req.header("authorization"));
  try {
    if (
      jwt.verify(
        req.header("authorization").substring(7),
        process.env.JWT_SECRET_KEY
      )
    ) {
      console.log(jwt.decode(req.header("authorization").substring(7)));
      res.send(JSON.stringify(await Todo.insert(req.body)));
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
});
router.delete("/:id", async function (req, res) {
  console.log(req.header("authorization"));
  try {
    if (
      jwt.verify(
        req.header("authorization").substring(7),
        process.env.JWT_SECRET_KEY
      )
    ) {
      console.log(jwt.decode(req.header("authorization").substring(7)));
      res.send(JSON.stringify(Todo.delete(req.params.id)));
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
});
router.put("/:id", async function (req, res) {
  console.log(req.header("authorization"));
  try {
    if (
      jwt.verify(
        req.header("authorization").substring(7),
        process.env.JWT_SECRET_KEY
      )
    ) {
      console.log(jwt.decode(req.header("authorization").substring(7)));
      res.send(JSON.stringify(await Todo.update(req.params.id, req.body)));
    } else {
      // Access Denied
      return res.status(401).send(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send(error);
  }
});

  router.get("/sort/user/:userId", async function (req, res) {
    console.log(req.header("authorization"));
    try {
      if (
        jwt.verify(
          req.header("authorization").substring(7),
          process.env.JWT_SECRET_KEY
        )
      ) {
        console.log(jwt.decode(req.header("authorization").substring(7)));
        res.send(JSON.stringify(await Todo.getAllByUserId(req.params.userId)));
      } else {
        // Access Denied
        return res.status(401).send(error);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send(error);
    }
  });

  router.put("/favourite/:id", async function (req, res) {
    console.log(req.header("authorization"));
    try {
      if (
        jwt.verify(
          req.header("authorization").substring(7),
          process.env.JWT_SECRET_KEY
        )
      ) {
        console.log(jwt.decode(req.header("authorization").substring(7)));
        res.send(JSON.stringify(await Todo.update(req.params.id, req.body)));
      } else {
        // Access Denied
        return res.status(401).send(error);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send(error);
    }
  });
  


  // Add a new route for filtering by date range
  router.get("/filter/date", async function (req, res) {
    console.log(req.header("authorization"));
    try {
      if (
        jwt.verify(
          req.header("authorization").substring(7),
          process.env.JWT_SECRET_KEY
        )
      ) {
        console.log(jwt.decode(req.header("authorization").substring(7)));
        const startDate = req.query.start_date;
        const endDate = req.query.end_date;
        res.send(JSON.stringify(await Todo.filterByDateRange(startDate, endDate)));
      } else {
        // Access Denied
        return res.status(401).send(error);
      }
    } catch (error) {
      console.log(error);
      return res.status(401).send(error);
    }
  });
  
  
  
module.exports = router;