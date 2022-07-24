module.exports = (app) => {
  const pr = require("../controllers/pr.controller.js");
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/createUser", pr.createUser);
  router.post("/loginUser", pr.loginUser);
  app.use("/api/user", router);
};
