const express = require("express");
const session = require("express-session");
const bcrypt = require('bcrypt');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;

//routes
const assets = require("./routes/assets");

const connection = require("./db/db");


app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//routes
app.use("/assets", assets);

app.get("/", async (req, res) => {
    req.session.userId = 1;
    req.session.loggedIn = true;
    res.send("logged in");
})

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
module.exports = connection;
