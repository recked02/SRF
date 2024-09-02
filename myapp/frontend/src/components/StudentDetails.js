import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';

const StudentDetails = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    father_name: '',
    mother_name: '',
    school_name: '',
    tenth_marks: '',
    twelfth_marks: '',
    college: '',
    branch: ''
  });
  const [message, setMessage] = useState('');
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [userId, setUserId] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setMessage('No token found');
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUserId(response.data.username || '');
      } catch (error) {
        setMessage('Failed to fetch user ID');
      }
    };

    fetchUserId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

// src/components/StudentDetails.js
const handleSubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post('http://localhost:5000/api/student/details', formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    setMessage(response.data.message);
    const studentId = response.data.id;
    navigate(`/student-details-display/${studentId}`);
  } catch (error) {
    setMessage(error.response?.data?.message || 'An error occurred');
  }
};


  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const toggleAccountDetails = () => {
    setShowAccountDetails(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

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
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-center text-[#6b7b93]">Student Details</h2>
          <div className="relative">
            <FaUserCircle
              size={30}
              className="text-[#6b7b93] cursor-pointer"
              onClick={toggleAccountDetails}
            />
            {showAccountDetails && (
              <div className="absolute top-12 right-0 bg-white border border-gray-300 rounded shadow-lg p-4 z-50">
                <div className="flex items-center">
                  {profilePic ? (
                    <img src={profilePic} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                  ) : (
                    <FaUserCircle size={48} className="text-[#6b7b93]" />
                  )}
                  <div>
                    <p className="text-[#6b7b93]">Username: {userId}</p>
                    <label className="block mt-2">
                      <input type="file" className="hidden" onChange={handleProfilePicChange} />
                      <span className="text-blue-500 cursor-pointer">Upload Picture</span>
                    </label>
                    <button
                      onClick={handleLogout}
                      className="mt-2 text-red-500 hover:underline"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Father's Name</label>
            <input
              type="text"
              name="father_name"
              value={formData.father_name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Mother's Name</label>
            <input
              type="text"
              name="mother_name"
              value={formData.mother_name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">School Name</label>
            <input
              type="text"
              name="school_name"
              value={formData.school_name}
              onChange={handleChange}
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
              value={formData.tenth_marks}
              onChange={handleChange}
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
              value={formData.twelfth_marks}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">College</label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Branch</label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#60799c] text-white font-semibold rounded hover:bg-[#d4d4d4]"
          >
            Submit
          </button>
          {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default StudentDetails;
