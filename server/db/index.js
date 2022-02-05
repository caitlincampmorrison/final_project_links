const db = require("./db");
const Student = require("./student");
const Campus = require("./campus");

//Student.belongsTo(Campus)

module.exports = { db, Student, Campus };