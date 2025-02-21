import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex items-center space-x-3">
                    <p className="text-2xl font-semibold dark:text-white">TaxEase</p>
                </div>

                <div className="flex md:order-2 space-x-3 md:space-x-0">
                    <button className="bg-slate-300 text-black py-2 px-4 rounded-md text-lg" onClick={() => navigate('/signup')}>Get Started</button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>

                <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full md:ml-10  md:flex md:w-auto md:order-1`}>
                    <ul className="flex flex-col md:flex-row md:bg-black md:bg-opacity-50  md:items-center md:text-xl md:border-slate-300 md:py-2 md:border md:px-10 md:rounded-full md:space-x-8  p-4 md:p-0 rounded-lg  border border-gray-100 ">
                        <li><p className='py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white  cursor-pointer' onClick={() => navigate('/')}>Home</p></li>
                        <li><p className='py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer' onClick={() => navigate('/about')}>About</p></li>
                        <li><p className='py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer' onClick={() => navigate('/taxCalculator')}>TaxSaver</p></li>
                        <li><p className='py-2 px-3 text-gray-900 hover:text-green-500 dark:text-white cursor-pointer' onClick={() => navigate('/documentStorage')}>DocVault</p></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
