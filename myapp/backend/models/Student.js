const db = require('../db');

/**
 * Create a new student in the database.
 * @param {Object} studentDetails - Details of the student to be created.
 * @param {Function} callback - Callback function to handle the result or error.
 */
const createStudent = (studentDetails, callback) => {
  const {
    name, phone, father_name, mother_name,
    school_name, tenth_marks, twelfth_marks, college, branch
  } = studentDetails;

  const query = `
    INSERT INTO students (
      name, phone, father_name, mother_name,
      school_name, tenth_marks, twelfth_marks, college, branch
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    name, phone, father_name, mother_name,
    school_name, tenth_marks, twelfth_marks, college, branch
  ], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err, null);
    }
    // Return the ID of the new student
    callback(null, { id: results.insertId });
  });
};

/**
 * Update an existing student in the database.
 * @param {number} id - ID of the student to be updated.
 * @param {Object} updatedDetails - Updated details of the student.
 * @param {Function} callback - Callback function to handle the result or error.
 */
const updateStudent = (id, updatedDetails, callback) => {
  const {
    name, phone, father_name, mother_name,
    school_name, tenth_marks, twelfth_marks, college, branch
  } = updatedDetails;

  const query = `
    UPDATE students SET
      name = ?, phone = ?, father_name = ?, mother_name = ?,
      school_name = ?, tenth_marks = ?, twelfth_marks = ?, college = ?, branch = ?
    WHERE id = ?
  `;

  db.query(query, [
    name, phone, father_name, mother_name,
    school_name, tenth_marks, twelfth_marks, college, branch, id
  ], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('No student found with the provided ID'));
    }
    callback(null);
  });
};

/**
 * Delete a student from the database.
 * @param {number} id - ID of the student to be deleted.
 * @param {Function} callback - Callback function to handle the result or error.
 */
const deleteStudent = (id, callback) => {
  const query = `DELETE FROM students WHERE id = ?`;

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      return callback(err);
    }
    if (result.affectedRows === 0) {
      return callback(new Error('No student found with the provided ID'));
    }
    callback(null);
  });
};

module.exports = { createStudent, updateStudent, deleteStudent };
