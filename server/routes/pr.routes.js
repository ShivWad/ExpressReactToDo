module.exports = (app) => {
  const pr = require("../controllers/pr.controller.js");
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/create", pr.create);
  router.get("/getTasks", pr.getTasks);
  router.get("/deleteTask", pr.deleteTask);
  router.post("/createUser",pr.createUser)
  app.use("/api/tasks", router);
};
