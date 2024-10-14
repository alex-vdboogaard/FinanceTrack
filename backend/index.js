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

const connection = require("./db/db");

app.use(cors());
app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//routes
app.use("/assets", assets);
app.use("/bank-accounts", bank_accounts);
app.use("/investments", investments);

app.get("/", async (req, res) => {
    req.session.userId = 1;
    req.session.loggedIn = true;
    res.send("logged in");
})

app.listen(port, () => { console.log(`Server live on port ${port}`) })
module.exports = connection;
