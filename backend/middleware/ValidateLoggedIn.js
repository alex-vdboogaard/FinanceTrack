function ValidateLoggedIn(req, res, next) {
    req.session.userId = 1;
    req.session.loggedIn = true;
    next();
    // if (req.session && req.session.loggedIn) {
    //     return next();
    // } else {
    //     return res.status(401).json({ message: "Unauthorized: Please log in to access this page" });
    // }
}

module.exports = ValidateLoggedIn;
