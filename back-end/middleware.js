const jwt = require("jsonwebtoken");

exports.authenticated = (req, res, next) => {
  let authHeader = req.headers["authorization"];

  if (!authHeader) {
    console.log("need header");
  }
  let token = authHeader.split("Bearer ")[1];
  console.log(authHeader);

  jwt.verify(token, "amin", (err, decoded) => {
    if (err) {
      return res.status(403).send({ message: "Your Token is Longer Valid" });
    }

    userId = decoded.id;
    next();
  });
};
