const restify = require("restify");
const { getWins } = require("./controllers/wins");
const { getPlayers } = require("./controllers/players");

var server = restify.createServer();
server.get("/wins", getWins);
server.get("/players", getPlayers);

server.pre(function(req, res, next) {
  req.headers.accept = "application/json";
  return next();
});
server.pre(restify.plugins.pre.dedupeSlashes());

server.use(function crossOrigin(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  return next();
});

server.listen(8080, function() {
  console.log("%s listening at %s", server.name, server.url);
});
