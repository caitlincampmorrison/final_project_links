const app = require("express").Router();

app.use("/students", require("./student"));
app.use("/campuses", require("./campus"));

module.exports = app;
