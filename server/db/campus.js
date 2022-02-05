const db = require('./db')
const Sequelize = require("sequelize");
const { STRING, INTEGER, UUID, UUIDV4, CHAR } = Sequelize.DataTypes;

const Campus = db.define('campus', {
    name: {
        type: STRING,
        allowNull: false
    },
    address: {
        type: STRING,
        allowNull: false
    },
    imageUrl: {
        type: STRING,
        allowNull: true
    },
    description: {
        type: STRING
    }
})

module.exports = Campus