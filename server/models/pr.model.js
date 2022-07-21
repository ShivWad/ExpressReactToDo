const sql = require("./pr.js");

const UserData = function (userData) {
  this.id = userData.Id;
  this.userName = userData.userName;
  this.emailId = userData.emailId;
};

UserData.create = (newUser, res) => {
  console.log("------------->", newUser.body);
  sql.query(
    `INSERT INTO userdata (ID, UserName,emailId) VALUES ("${newUser.body.id}", "${newUser.body.userName}","${newUser.body.emailId}")`,

    (err, res) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("created tutorial:", { id: res.userId, ...newUser });
    }
  );
};

module.exports = UserData;
