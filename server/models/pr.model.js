const sql = require("./pr.js");
const jwt = require("jsonwebtoken");

const UserData = function (userData) {
  this.taskId = userData.taskId;
  this.userId = userData.userId;
  this.taskAct = userData.taskAct;
  (this.userName = userData.userName),
    (this.userEmail = userData.userEmail),
    (this.userPassword = userData.userPassword);
};
/**
 * Creates a new task
 * @param {*} newTask
 * @param {*} result
 */
UserData.create = (newTask, result) => {
  console.log("------------->", newTask);
  sql.query(
    `INSERT INTO usertasks (UserId, TaskAct) VALUES ("${newTask.userId}","${newTask.taskAct}")`,
    newTask,
    (err, res) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          result({ err: err, status: 409 }, null);
        } else result({ err: err, status: 500 }, null);
        return;
      }
      console.log("created Task:", { id: res.insertId, ...newTask });
      result(null, { id: res.insertId, ...newTask });
    }
  );
};

/**
 * Query all the tasks with corresponding userID
 * @param {*} userId
 * @param {*} result
 */
UserData.getTasks = (userId, result) => {
  sql.query(`Select * FROM usertasks where userId=${userId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

UserData.deleteTask = (taskId, result) => {
  sql.query(`DELETE FROM usertasks WHERE taskId=${taskId}`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

UserData.createUser = (userData, result) => {
  console.log("---------->", userData);
  sql.query(
    `INSERT INTO userdata (UserName, EmailId, UserPassword) VALUES ("${userData.userName}",LOWER("${userData.userEmail}"),md5("${userData.userPassword}"))`,
    (err, res) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          result({ err: err, status: 409 }, null);
        } else result({ err: err, status: 500 }, null);
        return;
      }
      console.log("created User:", { id: res.userId, ...userData });
      result(null, { id: res.insertId, ...userData });
    }
  );
};

UserData.loginUser = (userData, result) => {
  sql.query(
    `SELECT * RESULT FROM userdata WHERE EmailId=${userData.userEmail}`,
    (err, res) => {
      if (err) {
        console.log(err);
      }
    }
  );
};
module.exports = UserData;
