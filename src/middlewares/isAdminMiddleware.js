const firebase = require("../helper/firebase");

const isAdminMiddleware = (req, res, next) => {
  const { token } = req.headers;
  return firebase
    .auth()
    .verifyIdToken(token)
    .then((claims) => {
      if (claims.userType !== "ADMIN") {
        return res
          .status(403)
          .json({ message: "UserType does not have permissions" });
      }
      return next();
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

module.exports = isAdminMiddleware;
