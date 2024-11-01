const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();
const cors = require("cors");

require("dotenv").config();
const port = process.env.PORT || 3001;

//routes
const assets = require("./routes/assets");
const bank_accounts = require("./routes/bank-accounts");
const investments = require("./routes/investments");
const overview = require("./routes/overview");
const savings = require("./routes/savings/savings");
const saving_goals = require("./routes/savings/saving-goals");
const budget = require("./routes/budget/budget");
const statements = require("./routes/statements");

const connection = require("./db/db");
app.use(express.json());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
        },
    })
);

//routes
app.use("/assets", assets);
app.use("/bank-accounts", bank_accounts);
app.use("/investments", investments);
app.use("/overview", overview);
app.use("/savings", savings);
app.use("/savings/goal", saving_goals);
app.use("/budget", budget);
app.use("/statements", statements);

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const query =
        "SELECT id, username, password FROM `User` WHERE username = ?";

    connection.query(query, [username], (err, results) => {
        if (err) {
            return res
                .status(500)
                .json({ message: "Error reading from the database" });
        }
        if (results.length === 0 || results[0].password !== password) {
            return res
                .status(401)
                .json({ message: "Invalid username or password" });
        }

        req.session.userId = results[0].id;
        req.session.loggedIn = true;
        res.status(200).json({ message: "Logged in" });
    });
});

const saltRounds = 10;
app.post("/create-account", async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    // Validate the input fields
    if (!username || !password || !firstName) {
        return res.status(400).json({ message: "Required fields missing" });
    }

    // Check if username is already taken
    const checkUsernameQuery = "SELECT id FROM `User` WHERE username = ?";
    connection.query(checkUsernameQuery, [username], async (err, results) => {
        if (err) {
            return res
                .status(500)
                .json({ message: "Error reading from the database" });
        }
        if (results.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Hash the password before saving to the database
        try {
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Insert the new user into the database
            const insertUserQuery = `
                INSERT INTO 'User' (username, password, first_name, last_name)
                VALUES (?, ?, ?, ?)
            `;
            connection.query(
                insertUserQuery,
                [username, hashedPassword, firstName, lastName || null],
                (err, results) => {
                    if (err) {
                        return res
                            .status(500)
                            .json({ message: "Error creating the account" });
                    }
                    res.status(201).json({
                        message: "Account created successfully",
                    });
                }
            );
        } catch (hashErr) {
            res.status(500).json({ message: "Error encrypting password" });
        }
    });
});

app.listen(port, () => {
    console.log(`Server live on port ${port}`);
});
module.exports = connection;
