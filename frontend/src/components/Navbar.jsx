import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FiMenu } from "react-icons/fi"; // Importing menu icon

export default function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 849);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsAuthenticated(!!token);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 849);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
    };

    return (
        <nav className="w-full z-20 top-0 start-0 shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                    <p className="text-2xl font-semibold dark:text-white">TaxEase</p>
                </div>

                {/* Desktop Menu (Visible only for non-mobile screens) */}
                {!isMobile && (
                    <ul className="hidden md:flex lg:px-10 text-lg md:flex md:flex-row md:rounded-full md:border md:border-gray-100 md:p-4 md:space-x-6">
                        <li>
                            <p className=" px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer" onClick={() => navigate("/")}>Home</p>
                        </li>
                        <li>
                            <p className=" px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer" onClick={() => navigate("/about")}>About</p>
                        </li>
                        <li>
                            <p className=" px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer" onClick={() => navigate("/taxCalculator")}>TaxSaver</p>
                        </li>
                        <li>
                            <p className="   px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer" onClick={() => navigate("/documentStorage")}>DocVault</p>
                        </li>
                    </ul>
                )}

                {/* User Icon / Get Started / Burger Icon */}
                <div className="flex md:order-2 space-x-3 md:space-x-0 relative items-center">
                    {!isAuthenticated && (
                        <button
                            className="py-2 px-4 text-lg bg-slate-300 text-black rounded-md"
                            onClick={() => navigate('/signup')}
                        >
                            Get Started
                        </button>
                    )}
                    {!isAuthenticated && isMobile && (
                        <button
                            className="text-white text-3xl lg:hidden md:px-3"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FiMenu />
                        </button>
                    )}

                    {/* Profile Icon for Mobile */}
                    {isAuthenticated && isMobile && (
                        <button
                            className="text-white text-2xl flex items-center"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <FaUserCircle size={36} />
                        </button>
                    )}

                    {/* Profile Dropdown (Desktop) */}
                    {isAuthenticated && !isMobile && (
                        <button
                            className="text-white text-2xl flex items-center"
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                        >
                            <FaUserCircle size={36} />
                        </button>
                    )}

                    {isAuthenticated && isProfileOpen && !isMobile && (
                        <div className="absolute top-full right-0 bg-white shadow-lg rounded-md p-2 w-32">
                            <p
                                className="text-gray-900 bg-slate-200 cursor-pointer p-2 rounded-md"
                                onClick={handleLogout}
                            >
                                Logout
                            </p>
                        </div>
                    )}
                </div>

                {/* Mobile Menu (Visible only on smaller screens) */}
                {isMobile && isMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-slate-400 z-50 shadow-lg">
                        <ul className="flex flex-col rounded-lg border border-gray-100 p-4">
                            <li>
                                <p className="py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer" onClick={() => navigate("/")}>Home</p>
                            </li>
                            <li>
                                <p className="py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer" onClick={() => navigate("/about")}>About</p>
                            </li>
                            <li>
                                <p className="py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer" onClick={() => navigate("/taxCalculator")}>TaxSaver</p>
                            </li>
                            <li>
                                <p className="py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer" onClick={() => navigate("/documentStorage")}>DocVault</p>
                            </li>
                            {isAuthenticated && (
                                <li>
                                    <button className="py-2 px-3 text-gray-900 bg-slate-200 cursor-pointer p-2 rounded-md " onClick={handleLogout}>Logout</button>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
}
