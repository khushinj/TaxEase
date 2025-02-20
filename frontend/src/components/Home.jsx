import React from 'react';
import taxbg from '../images/Taxbg.jpeg';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import FeatureCards from './FeatureCards';

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="h-full  bg-gradient-to-b from-[#F5F5F5] via-[#F5F5F5] via-60% to-[#64ABA7] items-center justify-center p-2">
            <div
                className="relative w-full h-screen bg-cover bg-center rounded-3xl"
                style={{ backgroundImage: `url(${taxbg})` }}
            >
                <div className="absolute"></div>
                <div className="relative z-10 flex flex-col justify-center items-center text-center text-white h-full">
                    <Navbar />
                    <div className="flex flex-col justify-center items-center h-full space-y-16 mb-14">
                        <div className='xl:px-32 md:px-10'>
                            <h1 className="xl:text-8xl md:text-7xl sm:text-6xl text-5xl font-normal text-slate-200  sm:mx-0 mx-5">Maximize Your Savings, Simplify Your Taxes!</h1>
                        </div>
                        <div className='text-lg md:flex md:flex-wrap md:justify-center grid gri-cols-2 items-center gap-4'>
                            <button className='text-emerald-700 hover:scale-105 transition-transform duration-300 bg-slate-100 font-medium py-2 px-4 rounded-lg' onClick={() => { navigate('/taxCalculator') }}>
                                Calculate my Tax savings
                            </button>
                            <button className='bg-emerald-900 py-2 border border-emerald-600 px-4 rounded-lg'>
                                Learn how it works
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='content my-20'>
                <h1 className='md:text-6xl sm:text-5xl text-4xl text-center lg:mx-20 md:mx-14 sm:mx-18 mx-6  mt-40'><span className='text-green-700'>Save more</span>, <span className='italic'>stress less</span>—TaxEase makes tax planning simple and hassle-free!</h1>
                {/* <h1 className='text-4xl italic'>At TaxEase, we simplify tax savings with smart, efficient, and secure solutions. We understand that tax planning can be complex, which is why we've built a platform that helps you calculate, save, and manage your taxes with ease.</h1> */}
            </div>
            <FeatureCards />

        </div>
    );
}