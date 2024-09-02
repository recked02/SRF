const express = require('express');
const { createStudent } = require('../controllers/studentController');
const {
  getStudentDetails,
  updateStudentDetails, // Import the updateStudentDetails function
  deleteStudent,
} = require('../controllers/studentController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/details', createStudent);
router.get('/details/:id', getStudentDetails); // Assuming you fetch student details by ID
router.put('/details/:id', authenticateToken, updateStudentDetails);
router.delete('/details/:id', authenticateToken, deleteStudent);


module.exports = router;
