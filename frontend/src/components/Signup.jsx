import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";


export default function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent default form submission
        setError('');
        setSuccess('');
        try {
            const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`, {
                name,
                email,
                password,
            });
            console.log(res);
            if (res.data.message) {
                setSuccess(res.data.message);
                setInterval(() => {
                    navigate('/login');
                }, 900);
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message); // handle error message from backend
            } else {
                setError('An unexpected error occurred.', err);
            }
        }
    };

    return (
        <div className='bg-gray-100'>
            <p onClick={() => { navigate('/') }} className='cursor-pointer sm:pt-5 sm:ps-10 ps-5 pt-8 flex items-center'> <IoChevronBack /> Back</p>
            <div className="flex items-center justify-center min-h-screen -mt-10">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md sm:w-full w-11/12">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
                        >
                            Sign Up
                        </button>
                    </form>

                    {error && <p className="mt-4 text-center text-sm text-red-500">{error}</p>}
                    {success && <p className="mt-4 text-center text-sm text-green-500">{success}</p>}

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-blue-500 hover:underline">
                            Log in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
