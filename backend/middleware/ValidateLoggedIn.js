function ValidateLoggedIn(req, res, next) {
  // if (req.session && req.session.loggedIn) {
  //     return next();
  // } else {
  //     return res.status(401).json({ message: "Unauthorized: Please log in to access this page" });
  // }

  req.session.loggedIn = true;
  req.session.userId = 1;
  next();
}

module.exports = ValidateLoggedIn;
