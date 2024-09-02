import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDetailsDisplay = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updatedStudent, setUpdatedStudent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/student/details/${id}`);
        setStudent(response.data);
        setUpdatedStudent(response.data); // Initialize with current student data
      } catch (error) {
        console.error('Error fetching student details:', error);
        setError('Failed to fetch student details');
      }
    };

    fetchStudentDetails();
  }, [id]);

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedStudent({ ...updatedStudent, [name]: value });
  };
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (!token) {
      setError('No token found');
      return;
    }
  
    try {
      const payload = {
        name: updatedStudent.name || '',
        phone: updatedStudent.phone || '',
        father_name: updatedStudent.father_name || '',
        mother_name: updatedStudent.mother_name || '',
        school_name: updatedStudent.school_name || '',
        tenth_marks: updatedStudent.tenth_marks || '',
        twelfth_marks: updatedStudent.twelfth_marks || '',
        college: updatedStudent.college || '',
        branch: updatedStudent.branch || ''
      };
  
      const response = await axios.put(`http://localhost:5000/api/student/details/${id}`, payload, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Update response:', response);
      setStudent(updatedStudent);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating student details:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        config: error.config
      });
      setError('Failed to update student details');
    }
  };
  
  

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/student/details/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      navigate('/student-details'); // Navigate back to the student list page
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Failed to delete student');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        className="absolute bg-[#CEF3FF] opacity-60"
        style={{
          width: '1300px',
          height: '1000px',
          top: '10px',
          left: '100px',
          right: '10px',
          borderRadius: '20px 20px 20px 20px',
        }}
      ></div>
      <div className="relative w-full max-w-lg p-8 bg-white rounded-lg shadow-md z-10">
        <h2 className="text-3xl font-semibold text-center text-[#6b7b93] mb-6">Student Details</h2>
        {isEditing ? (
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={updatedStudent.name || ''}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={updatedStudent.phone || ''}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Father's Name</label>
              <input
                type="text"
                name="father_name"
                value={updatedStudent.father_name || ''}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Mother's Name</label>
              <input
                type="text"
                name="mother_name"
                value={updatedStudent.mother_name || ''}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">School Name</label>
              <input
                type="text"
                name="school_name"
                value={updatedStudent.school_name || ''}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">10th Marks</label>
              <input
                type="number"
                step="0.01"
                name="tenth_marks"
                value={updatedStudent.tenth_marks || ''}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">12th Marks</label>
              <input
                type="number"
                step="0.01"
                name="twelfth_marks"
                value={updatedStudent.twelfth_marks || ''}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">College</label>
              <input
                type="text"
                name="college"
                value={updatedStudent.college || ''}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Branch</label>
              <input
                type="text"
                name="branch"
                value={updatedStudent.branch || ''}
                onChange={handleUpdateChange}
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="py-2 px-4 bg-[#60799c] text-white rounded hover:bg-[#d4d4d4]"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {Object.entries(student).map(([key, value]) => (
                <li key={key} className="text-lg">
                  <strong className="text-[#60799c] capitalize">{key.replace('_', ' ')}:</strong> {value}
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <button
                onClick={() => setIsEditing(true)}
                className="py-2 px-4 bg-[#60799c] text-white rounded hover:bg-[#d4d4d4]"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDetailsDisplay;
