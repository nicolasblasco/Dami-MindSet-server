const firebase = require("../helper/firebase");

const isCandidateMiddleware = (req, res, next) => {
  const { token } = req.headers;
  return firebase
    .auth()
    .verifyIdToken(token)
    .then((claims) => {
      if (claims !== "CANDIDATE") {
        return res
          .status(400)
          .json({ message: "UserType does not have permissions" });
      }
      return next();
    })
    .catch((error) => {
      res.status(401).json({ message: error.toString() });
    });
};

module.exports = isCandidateMiddleware;
