const connection = require("../db");

function getPlayers(req, res, next) {
  connection.query("SELECT name, shortName FROM players;", (err, result) => {
    if (err) {
      console.error(err);
      console.error("Something went wrong getting players");
    } else {
      res.send(result);
    }
  });
  next();
}

module.exports = {
  getPlayers
};
