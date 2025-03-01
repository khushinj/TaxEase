import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoChevronBack } from "react-icons/io5";
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
                email,
                password,
            });

            localStorage.setItem('user', JSON.stringify({ email, token: data.token }));
            localStorage.setItem('email', email);
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('token', data.token)
            setSuccess('Login successful!');
            if (data.token) {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className='bg-gray-100'>
            <button onClick={() => { navigate('/', { replace: true }) }} className='cursor-pointer sm:pt-5 sm:ps-10 ps-5 pt-8 flex items-center'>
                <IoChevronBack /> Back
            </button>

            <div className="flex items-center justify-center min-h-screen -mt-10">
                <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md sm:w-full w-11/12">
                    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Log In</h2>
                    <form onSubmit={handleSubmit}>

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

                        <div className="mb-6">
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
                            Log In
                        </button>
                    </form>

                    {error && (<p className="mt-4 text-center text-sm text-red-500">{error}</p>)}
                    {success && (<p className="mt-4 text-center text-sm text-green-500">{success}</p>)}

                    <p className="mt-4 text-center text-sm text-gray-600">
                        <a href="/forgot-password" className="text-blue-500 hover:underline">
                            Forgot your password?
                        </a>
                    </p>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
