const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(400).json({
      message: "access denied",
    });
  } else {
    next();
  }
};

module.exports = adminMiddleware;
