module.exports = app => {
    const pr = require("../controllers/pr.controller.js");
    var router = require("express").Router();
    // Create a new Tutorial
    router.post("/create", pr.create);

};