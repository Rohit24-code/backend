const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  let token = req.headers.accesstoken?.split(" ")[1];

  if (!token) {
    return res.status(400).json({
      message: "invalid token",
    });
  } else {
    var decoded = await jwt.verify(token, process.env.PRIVATE_KEY);
    console.log(decoded, "decoded");
    req.user = decoded;
    next();
  }
};

module.exports = authMiddleware;
