import React from "react";

const TaxSavingStrategies = () => {
  const strategies = [
    {
      title: "Investments Under Section 80C",
      details: "Save up to ₹1.5 lakh by investing in ELSS, PPF, NPS, FD, etc.",
      link: "https://incometaxindia.gov.in/pages/tax-information.aspx",
    },
    {
      title: "Health Insurance (Section 80D)",
      details: "Get deductions up to ₹25,000 (₹50,000 for senior citizens).",
      link: "https://cleartax.in/s/section-80d-deduction-medical-insurance",
    },
    {
      title: "Home Loan Tax Benefits",
      details: "Claim deductions on principal (80C) and interest paid (Section 24).",
      link: "https://cleartax.in/s/section-24-income-tax",
    },
    {
      title: "Education Loan (Section 80E)",
      details: "Tax deduction on interest paid for higher education loans.",
      link: "https://cleartax.in/s/section-80e-income-tax",
    },
    {
      title: "House Rent Allowance (HRA)",
      details: "Reduce taxable income if you’re paying rent and meet eligibility.",
      link: "https://cleartax.in/s/house-rent-allowance-hra-exemption",
    },
    {
      title: "Leave Travel Allowance (LTA)",
      details: "Exemptions for travel expenses incurred within India.",
      link: "https://cleartax.in/s/leave-travel-allowance-lta",
    },
    {
      title: "Standard Deduction",
      details: "Flat deduction of ₹50,000 for salaried employees.",
      link: "https://cleartax.in/s/standard-deduction",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-6xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-center text-green-700 mb-6">
          Tax-Saving Strategies 💰
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Maximize your tax savings with these effective strategies.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((item, index) => (
            <div 
              key={index} 
              className="p-6 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300"
            >
              <h2 className="text-2xl font-semibold text-green-600 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-700 mb-3">{item.details}</p>
              <a 
                href={item.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-600 hover:underline font-medium"
              >
                Learn More ↗
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaxSavingStrategies;
