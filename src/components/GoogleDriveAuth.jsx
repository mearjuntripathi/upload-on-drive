// src/components/GoogleDriveAuth.js
import React from 'react';

const GoogleDriveAuth = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Welcome to Google Drive Integration</h1>
      <button 
        onClick={onLogin} 
        className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50 mb-4"
        aria-label="Sign in with Google"
      >
        <i className="uil uil-google mr-3 text-2xl"></i> {/* Increased margin to 3 for more space */}
        Sign In with Google
      </button>
      <p className="mt-4 text-gray-700 text-center">
        Access your files with ease and manage them effectively. 
        <span className="text-blue-500 font-semibold"> Get started now!</span>
      </p>
    </div>
  );
};

export default GoogleDriveAuth;
