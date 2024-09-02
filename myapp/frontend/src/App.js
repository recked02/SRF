import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import StudentDetails from './components/StudentDetails';
import StudentDetailsDisplay from './components/StudentDetailsDisplay'; // Import the component
import PrivateRoute from './components/PrivateRoute'; // Ensure PrivateRoute is properly defined

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/student-details"element={<PrivateRoute>
              <StudentDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/student-details-display/:id"
          element={
            <PrivateRoute>
              <StudentDetailsDisplay />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
