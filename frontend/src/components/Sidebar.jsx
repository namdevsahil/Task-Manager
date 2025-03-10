import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-xl font-bold">Task Manager</h2>
      <nav className="mt-5">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="block p-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="block p-2 rounded hover:bg-gray-700">
              Tasks
            </Link>
          </li>
          <li>
            <Link to="/settings" className="block p-2 rounded hover:bg-gray-700">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
