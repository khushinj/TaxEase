import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const steps = [
    {
        title: "Visit the Official e-Filing Portal",
        description: [
            "Navigate to the Income Tax Department's official e-filing portal.",
            "Click on the 'Login' button to access your account.",
        ],
    },
    {
        title: "Log In to Your Account",
        description: [
            "Enter your Permanent Account Number (PAN) as the User ID.",
            "Provide your password and the captcha code.",
            "Click 'Login' to access your dashboard.",
        ],
    },
    {
        title: "Navigate to 'e-File'",
        description: [
            "After logging in, hover over the 'e-File' menu.",
            "Click on 'Income Tax Return' from the dropdown options.",
        ],
    },
    {
        title: "Choose the Relevant ITR Form",
        description: [
            "Select the appropriate ITR form based on your income sources. For salaried individuals, ITR-1 (Sahaj) is typically applicable.",
            "Click 'Continue' to proceed.",
        ],
    },
    {
        title: "Fill in Personal Details",
        description: [
            "Enter your personal information, including name, date of birth, and contact details.",
            "Ensure all details are accurate and match your official records.",
        ],
    },
    {
        title: "Provide Income Details",
        description: [
            "Input your income details, such as salary, house property income, and other sources.",
            "Ensure you have all necessary documents, like Form 16, to accurately report your income.",
        ],
    },
    {
        title: "Claim Deductions",
        description: [
            "Declare any deductions under sections like 80C, 80D, etc., to reduce your taxable income.",
            "Refer to your investment proofs and receipts to claim eligible deductions.",
        ],
    },
    {
        title: "Verify and Submit",
        description: [
            "Review all the information entered for accuracy.",
            "Click 'Submit' to file your return.",
        ],
    },
];

const ITRGuide = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 min-h-screen py-10 px-4">
            {/* Back Button */}
            <button
                onClick={() => navigate("/")}
                className="flex items-center text-green-700 font-semibold hover:text-green-800 transition-all duration-200 mb-6"
            >
                <IoChevronBack className="mr-2 text-xl" /> Back
            </button>

            {/* Heading */}
            <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
                Income Tax Return Filing Guide 📑
            </h1>
            <p className="text-lg text-gray-600 text-center mb-10">
                Follow these simple steps to file your ITR correctly.
            </p>

            {/* Steps Grid */}
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transform hover:-translate-y-2 transition duration-300"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-green-600 text-white text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full">
                                {index + 1}
                            </div>
                            <h2 className="text-xl font-semibold text-green-700">
                                {step.title}
                            </h2>
                        </div>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            {step.description.map((desc, idx) => (
                                <li key={idx} className="text-gray-600">
                                    {desc}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ITRGuide;
