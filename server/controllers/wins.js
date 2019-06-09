const connection = require("../db");

function getWins(req, res, next) {
  connection.query(
    "SELECT vote AS candidate, COUNT(username) as wins FROM wins GROUP BY vote;",
    (err, result) => {
      if (err) {
        console.error(err);
        console.error("Something went wrong getting wins");
      } else {
        res.send(result);
      }
    }
  );
  next();
}

module.exports = {
  getWins
};
