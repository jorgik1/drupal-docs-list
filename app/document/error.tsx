"use client";
import React from 'react';

interface ErrorProps {
    error: number;
    reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
    const errorMessage = error
        ? `An error ${error} occurred on the server`
        : 'An error occurred on the client';

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-500 mb-4">Oops!</h1>
                <p className="text-lg mb-6">{errorMessage}</p>
                <button onClick={() => reset()}>Try again</button>
            </div>
        </div>
    );
};

export default Error;