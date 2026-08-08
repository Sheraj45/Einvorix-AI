const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization;

  console.log("TOKEN RECEIVED:", token ? "YES" : "NO");
  console.log("JWT SECRET EXISTS:", process.env.JWT_SECRET ? "YES" : "NO");

  if (!token) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("JWT VERIFIED:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT ERROR NAME:", error.name);
    console.log("JWT ERROR MESSAGE:", error.message);

    return res.status(401).json({
      message: "Invalid or Expired Token",
    });
  }
};

module.exports = protect;
