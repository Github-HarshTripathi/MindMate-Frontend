import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen pt-28 px-4 bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold cyber-text text-center mb-6">404</h1>
      <p className="text-xl text-purple-300 mb-8">The page you are looking for doesn't exist.</p>
      <Link to="/" className="cyber-button px-6 py-3 rounded-xl">
        Return Home
      </Link>
    </div>
  );
};

export default NotFound;