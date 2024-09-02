const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signUp = (req, res) => {
  const { username, password } = req.body;
  User.getUserByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length > 0) return res.status(400).json({ message: 'User already exists' });

    User.createUser({ username, password }, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      res.status(201).json({ message: 'User created successfully' });
    });
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  User.getUserByUsername(username, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error' });
    if (results.length === 0) return res.status(400).json({ message: 'User not found' });

    const user = results[0];
    if (user.password !== password) return res.status(400).json({ message: 'Incorrect password' });

    // Generate JWT token
    const token = jwt.sign({ id: user.id, username: user.username }, 'secret', { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  });
};

// Get user info by token
const getUserInfo = (req, res) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const decoded = jwt.verify(token, 'secret');
    User.getUserById(decoded.id, (err, results) => {
      if (err) return res.status(500).json({ message: 'Database error' });
      if (results.length === 0) return res.status(404).json({ message: 'User not found' });

      res.status(200).json({ username: results[0].username });
    });
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = {
  signUp,
  login,
  getUserInfo
};
