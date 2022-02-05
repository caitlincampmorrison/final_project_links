const db = require('./db')
const Sequelize = require("sequelize");
const { STRING, DECIMAL, UUID, UUIDV4, CHAR, INTEGER } = Sequelize.DataTypes;

const Student = db.define('student', {
    first_name: {
        type: STRING,
        allowNull: false
    },
    last_name: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false,
        isEmail: true
    },
    imageUrl: {
        type: STRING
    },
    gpa: {
        type: DECIMAL
    },
    campus_name: {
        type: STRING
    }
})

module.exports = Student