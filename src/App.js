import React, { useState } from 'react';
import { useGoogleDrive } from './hooks/useGoogleDrive';
import GoogleDriveAuth from './components/GoogleDriveAuth';
import GoogleDriveFiles from './components/GoogleDriveFiles';
import FileUpload from './components/FileUpload';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [refresh, setRefresh] = useState(false); // State to trigger refresh
  const { handleLogin, handleLogout } = useGoogleDrive(setIsLoggedIn, setUserEmail);

  const refreshFiles = () => {
    setRefresh(prev => !prev); // Toggle refresh state to re-fetch files
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!isLoggedIn ? (
        <GoogleDriveAuth onLogin={handleLogin} />
      ) : (
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Logged in as: {userEmail}</h2>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            >
              <i className='uil uil-signout mr-3'></i>
              Logout
            </button>
          </div>
          <div className='flex flex-col items-center mb-4'>
            <FileUpload onUpload={refreshFiles} /> {/* Pass the refresh function */}
          </div>
          <GoogleDriveFiles refresh={refresh} />
        </div>
      )}
    </div>
  );
};

export default App;
