// src/components/LoadingIndicator.js
import React from 'react';

const LoadingIndicator = ({ loading }) => {
    return (
        loading && <div className="text-center my-4">Loading...</div>
    );
};

export default LoadingIndicator;
