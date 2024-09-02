import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });     
      setMessage(response.data.message);
      localStorage.setItem("token",response.data.token);
      console.log(response.data.message,"response.data.message")
      navigate('/student-details'); // Redirect to student details page
    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <div
        className="absolute bg-[#CEF3FF] opacity-60"
        style={{
          width: '1400px',
          height: '626px',
          top: '50px',
          left: '50px',
          borderRadius: '20px 20px 20px 20px',
        }}
      ></div>
      <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-md z-10">
        <h2 className="text-3xl font-semibold text-center text-[#6b7b93]">Login</h2>
        <p className="mt-2 text-center text-[#a0aec0]">Enter your credentials to access your account</p>
        <form className="mt-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm text-[#6b7b93]">User ID</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-[#6b7b93] bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm text-[#6b7b93]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 text-[#6b7b93] bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#667eea] rounded-md hover:bg-[#5a67d8] focus:outline-none focus:bg-[#5a67d8]"
            >
              Login
            </button>
          </div>
        </form>
        {message && <p className="mt-4 text-red-500 text-center">{message}</p>}
        <p className="mt-8 text-xs font-light text-center text-[#a0aec0]">
          Don't have an account?{" "}
          <Link to="/signup" className="font-medium text-[#667eea] hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
