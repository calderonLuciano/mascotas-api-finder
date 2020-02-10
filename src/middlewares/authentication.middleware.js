const jwt = require('jsonwebtoken');

let verifyToken = (req, res, next) => {
  let token = req.get('Authorization');

  jwt.verify(token, 'secret', (err, decoded) => {
    if (err) return res.status(401).send({ok: false, err});
    req.user = decoded.user;
  });

 
  next();
}

module.exports = {
   verifyToken 
  };