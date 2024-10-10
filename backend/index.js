const express = require("express");
const session = require("express-session");
const bcrypt = require('bcrypt');
const app = express();
const mysql = require("mysql2")
require('dotenv').config();
const port = process.env.PORT || 3001;

const user = require("./global");

const connection = mysql.createConnection({
    host: '127.0.0.1', // Change this if your database is hosted elsewhere
    user: 'root', // Replace with your MySQL username
    password: 'Emile1234!!', // Replace with your MySQL password
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
app.get("/test", async (req, res) => {
    connection.query('SELECT * FROM `User`', (err, results) => {
        if (err) {
            console.error('Error fetching users:', err);
            return;
        }
        console.log('Users:', results);
    });
})
app.get("/dashboard", async (req, res) => {
    try {
        connection.query(
            'SELECT * FROM [User]',
            function (err, results, fields) {
                if (result.recordset.length > 0) {
                    // const match = bcrypt.compare(req.body.password, result.recordset[0].password);
                    if (true) {
                        const u = results.recordset[0];

                        user.username = u.username;
                        user.firstName = u.firstName;
                        user.lastName = u.lastName;
                        user.dateJoined = u.dateJoined;

                        req.session.user = user;
                        localStorage.setItem("user", JSON.stringify(user));
                        res.status(200).json(user);
                    }
                    else {
                        res.status(401).json({ message: "Incorrect username or" })
                    }
                } else {
                    res.status(401).json({ message: "Incorrect username or password" })
                }
            }
        );


        console.log(results); // results contains rows returned by server
        console.log(fields); // fields contains extra meta data about results, if available
    } catch (err) {
        console.log(err);
    }

})
app.post('/login', async (req, res) => {
    try {
        const pool = await connectToDatabase();
        const result = await pool.request()
            .input('id', sql.Int, req.body.username)
            .query('SELECT * FROM [User] WHERE id = @id');

        if (result.recordset.length > 0) {
            const match = bcrypt.compare(req.body.password, result.recordset[0].password);
            if (match) {
                const u = result.recordset[0];

                user.username = u.username;
                user.firstName = u.firstName;
                user.lastName = u.lastName;
                user.dateJoined = u.dateJoined;

                req.session.user = user;
                localStorage.setItem("user", JSON.stringify(user));
                res.status(200).json(user);
            }
            else {
                res.status(401).json({ message: "Incorrect username or" })
            }
        } else {
            res.status(401).json({ message: "Incorrect username or password" })
        }
    } catch (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ message: 'Error querying user' });
    }
});

app.listen(port, () => { console.log(`Server live on port ${port}`) })
