import React from 'react';
import { Calculator, FileLock2, HandCoins } from "lucide-react";

export default function FeatureCards() {
    const features = [
        {
            icon: <Calculator size={40} />,
            title: "Smart Tax Calculator",
            description: "Quickly estimate your tax savings with our AI-powered tool.",
        },
        {
            icon: <FileLock2 size={40} />,
            title: "Secure DocVault",
            description: "Upload and access your tax documents in one secure place.",
        },
        {
            icon: <HandCoins size={40} />,
            title: "Maximize Savings",
            description: "Discover expert strategies to legally reduce your tax burden.",
        },
    ];

    return (
        <div className="my-60 text-center">
            <h1 className='text-center sm:text-6xl text-4xl pb-14'>Why Choose Us?</h1>


            <div className="grid grid-cols-1 lg:grid-cols-3 lg:size-50 gap-8 place-items-center mt-10">
                {features.map((feature, index) => (
                    <div key={index} className="bg-[#F8F6F6] hover:scale-105 transition-transform duration-300 p-6 rounded-2xl text-center drop-shadow-2xl lg:w-80 lg:h-70 sm:h-auto md:w-3/6 sm:w-90 w-80 h-70 border border-slate-500">
                        <div className="text-4xl mt-4 flex justify-center items-center text-[#1E3932]">
                            {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mt-6">{feature.title}</h3>
                        <p className="text-gray-600 mt-5">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
