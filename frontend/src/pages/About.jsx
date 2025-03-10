import React from "react";
import Navbar from "../components/Navbar.jsx";

const ReadMore = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">
        Discover the Power of Smart Task Management
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-6">
        Managing your tasks shouldn't be a hassle. With our intuitive Task Manager, you can organize your daily work, track progress, and stay focused—all in one place!
      </p>

      <h2 className="text-2xl font-semibold text-blue-500 mb-4">Why Choose Our Task Manager?</h2>
      <div className=" list-inside text-gray-700 dark:text-gray-300 space-y-2">
        <li>✅ <strong>Effortless Task Management</strong>  Share tasks with your team and boost efficiency.</li>
        <li>✅ <strong>Dark Mode & Custom Themes</strong>  Work in a way that suits your style.</li>
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-4">Stay Ahead with Advanced Features</h2>
      <div className="text-gray-700 dark:text-gray-300 space-y-2">
        <li><strong>Task Prioritization</strong>  Focus on what matters most by setting task priorities.</li>
        <li><strong>Deadline Reminders</strong>  Never miss an important task with automated alerts.</li>
        <li><strong>User-friendly Dashboard</strong>  A clean, modern UI for a seamless experience.</li>
        <li><strong>Secure & Reliable</strong>  Your data is protected with top security measures.</li>
      </div>

      <h2 className="text-2xl font-semibold text-blue-500 mt-6 mb-4">How It Works?</h2>
      <div className="text-gray-700 dark:text-gray-300 space-y-2">
        <li><strong>Sign Up & Login</strong>  Create your account and access your dashboard.</li>
        <li><strong>Create & Organize Tasks</strong>  Add tasks, set deadlines, and categorize them.</li>
        <li><strong>Track Progress & Notifications</strong>  Stay informed about changes and updates.</li>
        <li><strong>Stay Productive & Achieve More</strong>  Manage your workload with ease!</li>
      </div>

      <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mt-6">
        <h3 className="text-xl font-semibold text-center mb-2">Join Thousands of Happy Users!</h3>
        <p className="text-center text-gray-700 dark:text-gray-300 italic">🌟 “This Task Manager has transformed my workflow—simple, powerful, and efficient!”</p>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <a href="register" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">🚀 Get Started Now</a>
    </div>
    <div>
        <a href="Login" className="bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">🔍 Explore More Features</a>
      </div>
    </div>
    </>
  );
};

export default ReadMore;