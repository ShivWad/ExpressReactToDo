const UserData = require("../models/pr.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const newTask = new UserData({
    // taskId: req.body.taskId,
    userId: req.body.userId,
    taskAct: req.body.taskAct,
  });
  UserData.create(newTask, (err, data) => {
    if (err) {
      res.status(err.status).send({
        message:
          err.err.message || "Some error occurred while creating the Tutorial.",
      });
    } else res.send(data);
  });
};

exports.getTasks = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const data = new UserData({
    userId: req.body.userId,
  });

  UserData.getTasks(data.userId, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    }
    if (data.length) res.send(data);
    else
      res.status(404).send({
        message: "No tasks found for the current user",
      });
  });
};

exports.deleteTask = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const data = new UserData({
    taskId: req.body.taskId,
  });

  UserData.deleteTask(data.taskId, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting the Task.",
      });
    } else res.status(200).send(data);
  });
};

exports.createUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const newUser = new UserData({
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPassword: req.body.userPassword,
  });

  UserData.createUser(newUser, (err, data) => {
    if (err) {
      res.status(err.status).send({
        message:
          err.err.message || "Some error occurred while creating the Tutorial.",
      });
    } else res.send(data);
  });
};

exports.loginUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  const userLogin = new UserData({
    userEmail: req.body.userEmail,
  });

  UserData.loginUser(userLogin, (err, data) => {
    if (err) {
      res.status(err.status).send({
        message:
          err.err.message || "Some error occurred while creating the Tutorial.",
      });
    } else res.send(data);
  });
};

exports.findOne = (req, res) => {};
exports.update = (req, res) => {};

exports.deleteAll = (req, res) => {};

exports.findAllPublished = (req, res) => {};
