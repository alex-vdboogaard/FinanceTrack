const express = require("express");
const session = require("express-session");
const bcrypt = require('bcrypt');
const app = express();
const cors = require("cors");

require('dotenv').config();
const port = process.env.PORT || 3001;

//routes
const assets = require("./routes/assets");
const bank_accounts = require("./routes/bank-accounts");
const investments = require("./routes/investments");
const overview = require("./routes/overview");
const savings = require("./routes/savings/savings");
const saving_goals = require("./routes/savings/saving-goals");

const connection = require("./db/db");
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false
    },
}));

//routes
app.use("/assets", assets);
app.use("/bank-accounts", bank_accounts);
app.use("/investments", investments);
app.use("/overview", overview);
app.use("/savings", savings);
app.use("/savings/goal", saving_goals);


app.get("/userid", (req, res) => {
    res.status(200).json(req.session.userId);
})
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const query = "SELECT id, username, password FROM `User` WHERE username = ?";

    connection.query(query, [username], (err, results) => {
        // if (err) {
        //     return res.status(500).json({ message: "Error reading from the database" });
        // }
        // if (results.length === 0 || results[0].password !== password) {
        //     return res.status(401).json({ message: "Invalid username or password" });
        // }

        req.session.userId = 1;
        req.session.loggedIn = true;
        res.status(200).json({ message: "Logged in" });
    });
});


app.listen(port, () => { console.log(`Server live on port ${port}`) })
module.exports = connection;
