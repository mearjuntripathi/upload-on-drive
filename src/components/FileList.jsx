// src/components/FileList.js
import React from 'react';

const FileList = ({ files, deleteFile, viewFile }) => {
    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4">Your Files:</h2>
            <ul>
                {files.map(file => (
                    <li key={file.id} className="flex justify-between items-center border-b py-2">
                        <span>{file.name}</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => viewFile(file.id)}
                                className="bg-green-500 text-white font-bold py-1 px-2 rounded hover:bg-green-600 transition duration-300"
                            >
                                View
                            </button>
                            <button
                                onClick={() => deleteFile(file.id)}
                                className="bg-red-500 text-white font-bold py-1 px-2 rounded hover:bg-red-600 transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
