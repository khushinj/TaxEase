import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    return (
        <nav className="w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3">
                    <p className="text-2xl font-semibold dark:text-white">TaxEase</p>
                </div>

                {/* User Icon or Get Started Button */}
                <div className="flex md:order-2 space-x-3 md:space-x-0">
                    <button
                        className={`py-2 px-4 text-lg flex items-center ${isAuthenticated ? 'text-white' : 'bg-slate-300 text-black rounded-md'
                            }`}
                        onClick={() => {
                            if (window.innerWidth < 768) {
                                setIsMenuOpen(!isMenuOpen); // Toggle menu on small screens
                            } else {
                                navigate('/profile'); // Navigate to profile on larger screens
                            }
                        }}
                    >
                        {isAuthenticated ? (
                            <FaUserCircle size={36} />
                        ) : (
                            <span>Get Started</span>
                        )}
                    </button>
                </div>

                {/* Menu Items */}
                <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:ml-10 md:flex md:w-auto md:order-1`}>
                    <ul className="flex flex-col md:flex-row md:bg-black md:bg-opacity-50 md:items-center md:text-xl md:border-slate-300 md:py-2 md:border md:px-10 md:rounded-full md:space-x-8 p-4 md:p-0 rounded-lg border border-gray-100">
                        <li><p className='py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer' onClick={() => navigate('/')}>Home</p></li>
                        <li><p className='py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer' onClick={() => navigate('/about')}>About</p></li>
                        <li><p className='py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer' onClick={() => navigate('/taxCalculator')}>TaxSaver</p></li>
                        <li><p className='py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer' onClick={() => navigate('/documentStorage')}>DocVault</p></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
