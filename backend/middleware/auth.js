//modulo jwt
const jwt = require("jsonwebtoken");
//validamos la autenticacion
const auth = (req, res, next) => {
  let jwtToken = req.header("Authorization");

  if (!jwtToken)
    return res.status(401).send("Authorization denied: there isno token");

  jwtToken = jwtToken.split(" ")[1];

  if (!jwtToken)
    return res.status(401).send("Authorization denied: there isno token");

  try {
    const payload = jwt.verify(jwtToken, process.env.SECRET_KEY_JWT);

    req.user = payload;

    next();
  } catch (error) {
    return res.status(401).send("Authorization denied: invalid token");
  }
};

//exportamos el modulo
module.exports = auth;
3;
