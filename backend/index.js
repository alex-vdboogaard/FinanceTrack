const express = require("express");
const session = require("express-session");
const bcrypt = require('bcrypt');
const app = express();
const mysql = require("mysql2")
require('dotenv').config();
const port = process.env.PORT || 3001;

//global
const user = require("./global");

//routes
const assets = require("./routes/assets");

const connection = mysql.createConnection({
    host: '127.0.0.1', // Change this if your database is hosted elsewhere
    user: 'root', // Replace with your MySQL username
    password: process.env.PASSWORD, // Replace with your MySQL password
    database: 'FinanceTrack' // The database you created
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', connection.threadId);
});

app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//routes
app.use("/assets", assets);

app.get("/test", async (req, res) => {
    connection.query('SELECT * FROM `User`', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return;
        }
        console.log('Users:', results);
    });
});

app.listen(port, () => { console.log(`Server live on port ${port}`) })
