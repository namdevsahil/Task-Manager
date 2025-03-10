import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu visibility

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand/Logo */}
                <div className="text-white text-lg font-bold">
                    <Link to="/">Task Manager</Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="block lg:hidden">
                    <button
                        onClick={toggleMenu} // Use the toggleMenu function here
                        className="text-gray-300 hover:text-white focus:outline-none"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                            />
                        </svg>
                    </button>
                </div>

                {/* Desktop Menu */}
                <ul className="hidden lg:flex space-x-4">
                    <li>
                        <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
                    </li>
                    <li>
                        <Link to="/tasks" className="text-gray-300 hover:text-white">Tasks</Link>
                    </li>
                    <li>
                        <Link to="/completed" className="text-gray-300 hover:text-white">Completed</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
                    </li>
                    <li>
                        <Link to="/settings" className="text-gray-300 hover:text-white">Settings</Link>
                    </li>
                </ul>
            </div>

            {/* Mobile Menu (Dropdown) */}
            {isOpen && (
                <div className="lg:hidden">
                    <ul className="flex flex-col space-y-2 mt-4">
                        <li>
                            <Link to="/" className="block text-gray-300 hover:text-white">Home</Link>
                        </li>
                        <li>
                            <Link to="/tasks" className="block text-gray-300 hover:text-white">Tasks</Link>
                        </li>
                        <li>
                            <Link to="/completed" className="block text-gray-300 hover:text-white">Completed</Link>
                        </li>
                        <li>
                            <Link to="/about" className="block text-gray-300 hover:text-white">About</Link>
                        </li>
                        <li>
                            <Link to="/settings" className="block text-gray-300 hover:text-white">Settings</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;