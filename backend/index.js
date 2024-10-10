const express = require("express");
const session = require("express-session");
const { connectToDatabase } = require("./db/db")
const bcrypt = require('bcrypt');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3001;

const user = require("./global");

app.use(express.json());
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post('login', async (req, res) => {
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

app.listen(port, () => { console.log(`Server live on port ${port}}`) })
