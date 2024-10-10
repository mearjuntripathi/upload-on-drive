import React, { useState } from 'react';
import { gapi } from 'gapi-script';
import { FOLDER_ID } from '../config';

const FileUpload = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false); // State to track uploading status
  const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress

  // Function to handle file selection
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadProgress(0); // Reset progress when a new file is selected
  };

  // Function to handle file upload
  const handleUpload = () => {
    setSuccess("");
    setError("");
    if (!selectedFile) {
      setError('Please select a file first.');
      return;
    }

    setIsUploading(true); // Set uploading status to true
    const accessToken = gapi.auth.getToken().access_token;
    const formData = new FormData();
    const metadata = {
      name: selectedFile.name,
      parents: [FOLDER_ID], // Replace with actual folder ID
    };

    formData.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
    formData.append('file', selectedFile);

    // Use XMLHttpRequest to monitor progress
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart');
    xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete); // Update upload progress
      }
    };

    xhr.onload = () => {
      const result = JSON.parse(xhr.responseText);
      if (xhr.status === 200 && result.id) {
        setSuccess('File uploaded successfully!');
        setError('');
        if (onUpload) onUpload(); // Call parent function to refresh file list
        setSelectedFile(null); // Clear selected file after upload
      } else if (result.error) {
        setError(`Upload failed: ${result.error.message}`);
      }
      setIsUploading(false); // Set uploading status to false
    };

    xhr.onerror = () => {
      setError('Error during file upload.');
      setIsUploading(false);
    };

    xhr.send(formData); // Send the form data
  };

  return (
    <div className="mt-4 w-full max-w-md mx-auto">
      <div className='flex'>

        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded mb-2 w-full"
        />

        <div className="flex items-center justify-between space-x-4 mb-2">
          <button
            onClick={handleUpload}
            className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isUploading} // Disable button if uploading
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>

        {/* Show upload progress when uploading */}
      </div>

      {isUploading && (
        <span className="text-gray-700 text-sm">{uploadProgress}%</span>
      )}
      {/* Error or success messages */}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
    </div>
  );
};

export default FileUpload;
