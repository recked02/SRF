const express = require('express');
const { signUp, login, getUserInfo } = require('../controllers/authController'); // Ensure correct import
const router = express.Router();

// Define routes and ensure that the handler functions are correctly referenced
router.post('/signup', signUp);
router.post('/login', login);
router.get('/user', getUserInfo); // Ensure this route and handler are correctly defined

module.exports = router;
