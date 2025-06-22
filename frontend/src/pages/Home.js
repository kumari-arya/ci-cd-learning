import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">
      Welcome to MERN CI/CD Learning Project
    </h1>
    <p className="text-xl text-gray-600 mb-8">
      A simple task management application built with the MERN stack
    </p>
    <div className="space-x-4">
      <Link
        to="/register"
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
      >
        Get Started
      </Link>
      <Link
        to="/login"
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
      >
        Login
      </Link>
    </div>
  </div>
);

export default Home;
