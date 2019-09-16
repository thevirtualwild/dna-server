const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

module.exports = function(req, res, next) {
  // Get token from the header
  const token = req.header('x-auth-token');

  //check if token exists
  if (!token) {
    return res.status(401).json({ msg: 'No Token. Auth Denied' });
  }

  try {
    const decoded = jwt.verify(token, keys.secretOrKey);
    //console.log("decoded:" + JSON.stringify(decoded));
    req.user = decoded;
    next();

  } catch {
    res.status(401).json({ msg: 'Token not valid' });
  }
}
