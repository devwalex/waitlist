const faker = require("faker");
const mysql = require("mysql");
const sql = require("./sql");
require("dotenv").config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true
});
connection.connect();

connection.query(sql, function(error, results, fields) {
  if (error) throw error;
  console.log("Table created successfully ", results);
});
connection.end();
