require("dotenv").config();

const mysql = require("mysql2");
const pool = mysql.createPool({
  multipleStatements: true,
  connectionLimit: 10,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = pool;
