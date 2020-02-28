const express = require("express");
const faker = require("faker");
const mysql = require("mysql");
const schema = require("./schema");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  multipleStatements: true
});
connection.connect();

/** 
 * Uncomment this to create user table
 * ====================================================
connection.query(schema, function(error, results) {
  if (error) throw error;
  console.log("Table created successfully ", results);
});
======================================================
*/

/**
 * 
Uncomment this to generate 500 user into the database
======================================================

let data = [];
for (let i = 0; i < 500; i++) {
  data.push([faker.internet.email(), faker.date.past()]);
}

connection.query("INSERT INTO users (email, created_at) VALUES ? ", [data], (error, results) => {
  if (error) throw error;
  console.log("User inserted", results);
});
======================================================
 */

app.get("/", (req, res) => {
  const query = "SELECT COUNT(*) AS count FROM users";
  connection.query(query, (error, results) => {
    if (error) throw error;
    const count = results[0].count;
    res.render("home", { count });
  });
});

app.post("/join", (req, res) => {
  const user = req.body;
  connection.query("INSERT INTO users SET ?", user, error => {
    if (error) throw error;
    res.redirect("/");
  });
});

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
