import React from "react";

const Home = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden">
      <div className="w-full max-w-4xl text-center p-0 m-0">
        <div className="hidden sm:flex sm:justify-center sm:mb-4">
          <div className="relative rounded-full px-3 py-1 text-sm font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white ring-1 ring-gray-900/10 dark:ring-gray-700 hover:ring-gray-900/20 dark:hover:ring-gray-500">
            Discover the Power of Smart Task Management.
            <a href="about" className="font-semibold text-indigo-600 dark:text-indigo-400 ml-1">
              Read more &rarr;
            </a>
          </div>
        </div>

        <h1 className="text-5xl font-bold sm:text-6xl text-gray-900 dark:text-white">
          Welcome to Task Manager
        </h1>
        <h2 className="text-2xl font-semibold mt-3 text-gray-800 dark:text-gray-300">
          🚀 Stay Organized. Stay Productive.
        </h2>
        <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300 sm:text-xl">
          Manage your tasks effortlessly with our smart and intuitive Task Manager.
          Get things done faster and stress-free!
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href="register"
            className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md hover:bg-indigo-500"
          >
            🔹 Get Started for Free
          </a>
          <a
            href="login"
            className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            🔹 Login to Your Dashboard
          </a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
