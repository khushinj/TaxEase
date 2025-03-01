import React from 'react';
import { FaFacebook, FaLink, FaLinkedin } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-white text-black py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold">TaxEase</h2>
                        <p className="mt-2 text-gray-800">
                            Providing reliable solutions since 2025.
                        </p>
                    </div>

                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-xl font-semibold">Quick Links</h3>
                        <ul className="mt-2">
                            <li>
                                <a href="/" className="text-gray-800 hover:text-white">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-800 hover:text-white">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/taxCalculator" className="text-gray-800 hover:text-white">
                                    TaxSaver
                                </a>
                            </li>
                            <li>
                                <a href="/documentStorage" className="text-gray-800 hover:text-white">
                                    DocVault
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/3">
                        <h3 className="text-xl font-semibold">Follow Us</h3>
                        <div className="mt-2 flex space-x-4">
                            <a href="https://facebook.com" className="text-gray-800 hover:text-gray-500">
                                <FaFacebook size={20} />
                            </a>
                            <a href="https://twitter.com" className="text-gray-800 hover:text-gray-500">
                                <BsTwitterX size={20} />

                            </a>
                            <a href="https://linkedin.com" className="text-gray-800 hover:text-gray-500">
                                <FaLinkedin size={20} />

                            </a>
                            <a href="https://instagram.com" className="text-gray-800 hover:text-gray-500">
                                <FaInstagram size={20} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-center text-gray-800">
                    &copy; 2025 TaxEase. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
