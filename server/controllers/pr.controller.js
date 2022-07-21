const db = require("../models/pr");
const UserData = require("../models/pr.model");

exports.create = (res, req) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const user = new UserData({
    id: req.body.Id,
    userName: req.body.userName,
    emailId: req.body.emailId,
  });

  UserData.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the user.",
      });
    else res.send(data);
  });
};

exports.findAll = (res, req) => {};

exports.findOne = (res, req) => {};
exports.update = (req, res) => {};
exports.delete = (req, res) => {};

exports.deleteAll = (req, res) => {};

exports.findAllPublished = (req, res) => {};
