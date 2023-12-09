// isAuth.js
const services = require("../services");

async function isAuth(req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(403).send({
        message: "No tienes autorización",
      });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = await services.decodeToken(token);
    console.log("Decoded Token:", decodedToken);

    // Asegurémonos de que 'sub' sea el ID del usuario y coloquemos el usuario en req.user
    req.user = { id: decodedToken.toString() };
    
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      message: "Token inválido",
    });
  }
}

module.exports = isAuth;