const util = require("util");
const mysql = require("mysql");
require('dotenv').config()

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "employees_db"
});

connection.connect();
connection.query = util.promisify(connection.query);
module.exports = connection;