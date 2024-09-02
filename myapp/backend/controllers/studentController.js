const connection = require('../db');
const studentModel = require('../models/Student');

// Create Student
const createStudent = (req, res) => {
  const studentDetails = req.body;
  console.log('Received student details:', studentDetails);  // Log the received data

  const query = 'INSERT INTO students SET ?';
  connection.query(query, studentDetails, (err, results) => {
    if (err) {
      console.error('Database error:', err);  // Log the error
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Student details saved successfully', id: results.insertId });
  });
};

// Get Student Details by ID
const getStudentDetails = (req, res) => {
  const { id } = req.params;  // Get the student ID from the route parameters

  const query = 'SELECT * FROM students WHERE id = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(results[0]);  // Send the student details as a response
  });
};

// Update student details by ID
const updateStudentDetails = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!id || !updatedData) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  const query = `
    UPDATE students SET
      name = ?, phone = ?, father_name = ?, mother_name = ?,
      school_name = ?, tenth_marks = ?, twelfth_marks = ?, college = ?, branch = ?
    WHERE id = ?
  `;

  db.query(query, [
    updatedData.name, updatedData.phone, updatedData.father_name, updatedData.mother_name,
    updatedData.school_name, updatedData.tenth_marks, updatedData.twelfth_marks, updatedData.college, updatedData.branch,
    id
  ], (err, result) => {
    if (err) {
      console.error('Error updating student details:', err);
      return res.status(500).json({ message: 'Failed to update student details' });
    }
    if (result.affectedRows > 0) {
      res.json({ message: 'Student details updated successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  });
};



// Delete student record by ID
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]);

    if (result.affectedRows > 0) {
      res.json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Failed to delete student' });
  }
};



module.exports = {
  createStudent,
  getStudentDetails,
  updateStudentDetails,
  deleteStudent
};
