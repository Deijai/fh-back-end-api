const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const validateToken = (req = request, res = response, next) => {
  // ler token no headers
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      message: "Token não existe.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token não é válido.",
    });
  }
};

module.exports = {
  validateToken,
};
