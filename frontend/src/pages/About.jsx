import React from "react";

const ReadMore = () => {
  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="w-full max-w-6xl mx-auto p-6 lg:p-12 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
        <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-300 mb-6">
          Discover the Power of Smart Task Management
        </h1>
        <p className="text-lg text-gray-800 dark:text-white text-center mb-6">
          Managing your tasks shouldn't be a hassle. With our intuitive Task Manager, you can organize your daily work, track progress, and stay focused—all in one place!
        </p>

        <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-300 mb-4">Why Choose Our Task Manager?</h2>
        <div className="text-gray-800 dark:text-white space-y-2">
          <p>✅ <strong className="text-">Effortless Task Management:</strong> Share tasks with your team and boost efficiency.</p>
          <p>✅ <strong>Dark Mode & Custom Themes:</strong> Work in a way that suits your style.</p>
        </div>

        <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-300 mt-6 mb-4">Stay Ahead with Advanced Features</h2>
        <div className="text-gray-800 dark:text-white space-y-2">
          <p><strong>Task Prioritization:</strong> Focus on what matters most by setting task priorities.</p>
          <p><strong>Deadline Reminders:</strong> Never miss an important task with automated alerts.</p>
          <p><strong>User-friendly Dashboard:</strong> A clean, modern UI for a seamless experience.</p>
          <p><strong>Secure & Reliable:</strong> Your data is protected with top security measures.</p>
        </div>

        <h2 className="text-2xl font-semibold text-blue-500 dark:text-blue-300 mt-6 mb-4">How It Works?</h2>
        <div className="text-gray-800 dark:text-white space-y-2">
          <p><strong>Sign Up & Login:</strong> Create your account and access your dashboard.</p>
          <p><strong>Create & Organize Tasks:</strong> Add tasks, set deadlines, and categorize them.</p>
          <p><strong>Track Progress & Notifications:</strong> Stay informed about changes and updates.</p>
          <p><strong>Stay Productive & Achieve More:</strong> Manage your workload with ease!</p>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mt-6">
          <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-2">
            Join Thousands of Happy Users!
          </h3>
          <p className="text-center text-gray-800 dark:text-white italic">
            🌟 “This Task Manager has transformed my workflow—simple, powerful, and efficient!”
          </p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <a href="register" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
            🚀 Get Started Now
          </a>
          <a href="login" className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            🔍 Explore More Features
          </a>
        </div>
      </div>
    </div>
  );
};

export default ReadMore;
