var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var restRouter = require("./routes/rest");
var dashRouter = require("./routes/dash");

var app = express();

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

restRouter.parseGraphQLServer.applyGraphQL(app);
restRouter.parseGraphQLServer.applyPlayground(app);

app.use("/", indexRouter);
app.use("/rest", restRouter.api.app);
app.use("/dash", dashRouter);

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
