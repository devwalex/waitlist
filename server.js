const faker = require("faker");
const mysql = require("mysql");
const schema = require("./schema");
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

/** Uncomment this to create user table
 * 
connection.query(schema, function(error, results) {
  if (error) throw error;
  console.log("Table created successfully ", results);
});

*/
let data = [];
for (let i = 0; i < 500; i++) {
  data.push([faker.internet.email(), faker.date.past()]);
}

connection.query("INSERT INTO users (email, created_at) VALUES ? ", [data], (error, results) => {
  if (error) throw error;
  console.log("User inserted", results);
});
connection.end();
