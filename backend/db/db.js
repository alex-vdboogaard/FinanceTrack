const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: process.env.SERVER,
  password: process.env.PASSWORD,
  database: "FinanceTrack",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as ID", connection.threadId);
});

module.exports = connection;
