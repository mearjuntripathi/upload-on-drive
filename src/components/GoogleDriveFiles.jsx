import React, { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';
import { FOLDER_ID } from '../config';

const GoogleDriveFiles = ({ refresh }) => {
    const [files, setFiles] = useState([]);

    // Function to fetch files from Google Drive
    const fetchFiles = () => {
        gapi.client.drive.files.list({
            q: `'${FOLDER_ID}' in parents`,
            fields: 'nextPageToken, files(id, name, webViewLink, webContentLink)',
        }).then(response => {
            setFiles(response.result.files);
        });
    };

    // Re-fetch files when refresh changes
    useEffect(() => {
        fetchFiles();
    }, [refresh]);

    // Function to truncate long file names
    const truncateFileName = (fileName, maxLength) => {
        if (fileName.length > maxLength) {
            return fileName.slice(0, maxLength) + '...';
        }
        return fileName;
    };

    // Function to handle file deletion
    const handleDelete = (fileId) => {
        const confirmed = window.confirm("Are you sure you want to delete this file?");
        if (confirmed) {
            gapi.client.drive.files.delete({
                fileId: fileId,
            })
            .then(() => {
                // Re-fetch files after deletion
                fetchFiles();
                alert("File deleted successfully!");
            })
            .catch((error) => {
                console.error("Error deleting file:", error);
                alert("Error deleting file: " + error.message);
            });
        }
    };

    return (
        <div className="mt-4">
            <ul className="mt-2">
                {files.map(file => (
                    <li key={file.id} className="flex justify-between items-center border-b py-2">
                        <span>{truncateFileName(file.name, 50)}</span> {/* Adjust maxLength as needed */}
                        <div className='flex gap-5'>
                            {/* View button */}
                            {file.webViewLink && (
                                <a
                                    href={file.webViewLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-600 transition duration-300"
                                >
                                    <i className="uil uil-eye"></i>
                                </a>
                            )}
                            {/* Download button */}
                            {file.webContentLink && (
                                <a
                                    href={file.webContentLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-600 transition duration-300"
                                >
                                    <i className="uil uil-download-alt"></i>
                                </a>
                            )}
                            {/* Delete button */}
                            <button
                                onClick={() => handleDelete(file.id)}
                                className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                            >
                                <i className="uil uil-trash"></i>
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GoogleDriveFiles;
