import React from 'react';
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        title: 'Step 1: Visit the Official e-Filing Portal',
        description: [
            'Navigate to the Income Tax Department\'s official e-filing portal.',
            'Click on the \'Login\' button to access your account.',
        ],
    },
    {
        title: 'Step 2: Log In to Your Account',
        description: [
            'Enter your Permanent Account Number (PAN) as the User ID.',
            'Provide your password and the captcha code.',
            'Click \'Login\' to access your dashboard.',
        ],
    },
    {
        title: 'Step 3: Navigate to \'e-File\' and Select \'Income Tax Return\'',
        description: [
            'After logging in, hover over the \'e-File\' menu.',
            'Click on \'Income Tax Return\' from the dropdown options.',
        ],
    },
    {
        title: 'Step 4: Choose the Relevant ITR Form',
        description: [
            'Select the appropriate ITR form based on your income sources. For salaried individuals, ITR-1 (Sahaj) is typically applicable.',
            'Click \'Continue\' to proceed.',
        ],
    },
    {
        title: 'Step 5: Fill in Personal Details',
        description: [
            'Enter your personal information, including name, date of birth, and contact details.',
            'Ensure all details are accurate and match your official records.',
        ],
    },
    {
        title: 'Step 6: Provide Income Details',
        description: [
            'Input your income details, such as salary, house property income, and other sources.',
            'Ensure you have all necessary documents, like Form 16, to accurately report your income.',
        ],
    },
    {
        title: 'Step 7: Claim Deductions',
        description: [
            'Declare any deductions under sections like 80C, 80D, etc., to reduce your taxable income.',
            'Refer to your investment proofs and receipts to claim eligible deductions.',
        ],
    },
    {
        title: 'Step 8: Verify and Submit',
        description: [
            'Review all the information entered for accuracy.',
            'Click \'Submit\' to file your return.',
        ],
    },
];

const ITRGuide = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <p className='flex items-center cursor-pointer mb-8' onClick={() => { navigate('/') }} > <IoChevronBack /> Back</p>
            <header className="text-green-600 font-semibold text-center text-3xl mb-8">
                Income Tax Return Filing Guide
            </header>
            <main className="grid lg:gap-12 gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 pt-10 lg:mx-10 mx-2">
                {steps.map((step, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-md h-60 lg:w-11/12">
                        <h2 className="text-xl font-semibold mb-4">{step.title}</h2>
                        {step.description.map((desc, idx) => (
                            <p key={idx} className="mb-2">{desc}</p>
                        ))}
                    </div>
                ))}
            </main>
        </div>
    );
};

export default ITRGuide;
