const connection = require('../db');

// Create a new user
const createUser = (user, callback) => {
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(query, [user.username, user.password], callback);
};

// Get a user by username
const getUserByUsername = (username, callback) => {
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], callback);
};

// Get a user by ID
const getUserById = (userId, callback) => {
  const query = 'SELECT username FROM users WHERE id = ?';
  connection.query(query, [userId], callback);
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById
};
