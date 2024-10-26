require("dotenv").config();

function ValidateLoggedIn(req, res, next) {
    if (process.env.MODE === "DEVELOPMENT") {
        req.session = req.session || {};
        req.session.loggedIn = true;
        req.session.userId = 1;
        return next();
    }

    if (req.session?.loggedIn) {
        return next();
    } else {
        return res.status(401).json({
            message: "Unauthorized: Please log in to access this page",
        });
    }
}

module.exports = ValidateLoggedIn;
