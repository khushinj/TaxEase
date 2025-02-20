import React from "react";
import { FaCalculator, FaFileAlt, FaCheckCircle } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <FaCalculator className="text-blue-500 text-4xl" />,
      title: "Tax Calculation",
      description: "Enter your income details and get an instant tax estimation."
    },
    {
      id: 2,
      icon: <FaFileAlt className="text-green-500 text-4xl" />,
      title: "Secure Document Storage (DocVault)",
      description: "Upload and manage all tax-related documents securely in one place."
    },
    {
      id: 3,
      icon: <FaCheckCircle className="text-yellow-500 text-4xl" />,
      title: "ITR Filing Steps",
      description: "Step-by-stepp guidance to file your ITR smoothly and error-free."
    }
  ];

  return (
    <div className="bg-gray-100 py-12 px-6 md:px-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        How It Works
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
          >
            {step.icon}
            <h3 className="text-xl font-semibold text-gray-700 mt-4">{step.title}</h3>
            <p className="text-gray-500 mt-2">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
