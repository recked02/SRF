const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, 'secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send({ message: 'Invalid Token' });
  }
};

module.exports = authenticateToken;
