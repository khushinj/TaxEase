import React from "react";
import { FaRupeeSign, FaHeart, FaHome, FaGraduationCap, FaBuilding, FaPlane, FaUserTie } from "react-icons/fa";

const TaxSavingStrategies = () => {
  const strategies = [
    {
      icon: <FaRupeeSign className="text-green-700 text-3xl" />,
      title: "Investments Under Section 80C",
      details: "Save up to ₹1.5 lakh by investing in ELSS, PPF, NPS, FD, etc.",
      link: "https://incometaxindia.gov.in/_layouts/15/dit/Pages/viewer.aspx?grp=Act&cname=CMSID&cval=102120000000086684&searchFilter=%5b%7b%22CrawledPropertyKey%22%3a1%2c%22Value%22%3a%22Act%22%2c%22SearchOperand%22%3a2%7d%2c%7b%22CrawledPropertyKey%22%3a0%2c%22Value%22%3a%22Income-tax+Act%2c+1961%22%2c%22SearchOperand%22%3a2%7d%2c%7b%22CrawledPropertyKey%22%3a29%2c%22Value%22%3a%222024+(No.+2)%22%2c%22SearchOperand%22%3a2%7d%5d&filterBy=S&optionalFilter=80c&k=&IsDlg=0",
    },
    {
      icon: <FaHeart className="text-green-700 text-3xl" />,
      title: "Health Insurance (Section 80D)",
      details: "Get deductions up to ₹25,000 (₹50,000 for senior citizens).",
      link: "https://incometaxindia.gov.in/_layouts/15/dit/Pages/viewer.aspx?grp=Act&cname=CMSID&cval=102120000000086694&searchFilter=[{%22CrawledPropertyKey%22:1,%22Value%22:%22Act%22,%22SearchOperand%22:2},{%22CrawledPropertyKey%22:0,%22Value%22:%22Income-tax%20Act,%201961%22,%22SearchOperand%22:2},{%22CrawledPropertyKey%22:29,%22Value%22:%222024%20(No.%202)%22,%22SearchOperand%22:2}]&k=&IsDlg=0",
    },
    {
      icon: <FaHome className="text-green-700 text-3xl" />,
      title: "Home Loan Tax Benefits",
      details: "Claim deductions on principal (80C) and interest paid (Section 24).",
      link: "https://incometaxindia.gov.in/_layouts/15/dit/Pages/viewer.aspx?grp=Act&cname=CMSID&cval=102120000000086537&searchFilter=%5b%7b%22CrawledPropertyKey%22%3a1%2c%22Value%22%3a%22Act%22%2c%22SearchOperand%22%3a2%7d%2c%7b%22CrawledPropertyKey%22%3a0%2c%22Value%22%3a%22Income-tax+Act%2c+1961%22%2c%22SearchOperand%22%3a2%7d%2c%7b%22CrawledPropertyKey%22%3a29%2c%22Value%22%3a%222024+(No.+2)%22%2c%22SearchOperand%22%3a2%7d%5d&filterBy=S&optionalFilter=24&k=&IsDlg=0",
    },
    {
      icon: <FaGraduationCap className="text-green-700 text-3xl" />,
      title: "Education Loan (Section 80E)",
      details: "Tax deduction on interest paid for higher education loans.",
      link: "https://incometaxindia.gov.in/_layouts/15/dit/Pages/viewer.aspx?grp=Act&cname=CMSID&cval=102120000000086697&searchFilter=%5b%7b%22CrawledPropertyKey%22%3a1%2c%22Value%22%3a%22Act%22%2c%22SearchOperand%22%3a2%7d%2c%7b%22CrawledPropertyKey%22%3a0%2c%22Value%22%3a%22Income-tax+Act%2c+1961%22%2c%22SearchOperand%22%3a2%7d%2c%7b%22CrawledPropertyKey%22%3a29%2c%22Value%22%3a%222024+(No.+2)%22%2c%22SearchOperand%22%3a2%7d%5d&filterBy=S&optionalFilter=80e&k=&IsDlg=0",
    },
    {
      icon: <FaBuilding className="text-green-700 text-3xl" />,
      title: "House Rent Allowance (HRA)",
      details: "Reduce taxable income if you’re paying rent and meet eligibility.",
      link: "https://incometaxindia.gov.in/_layouts/15/dit/Pages/viewer.aspx?grp=Act&cname=CMSID&cval=102120000000087425&searchFilter=[{%22CrawledPropertyKey%22:1,%22Value%22:%22Act%22,%22SearchOperand%22:2},{%22CrawledPropertyKey%22:0,%22Value%22:%22Income-tax%20Act,%201961%22,%22SearchOperand%22:2},{%22CrawledPropertyKey%22:29,%22Value%22:%222024%20(No.%202)%22,%22SearchOperand%22:2}]&k=&IsDlg=0",
    },
    {
      icon: <FaPlane className="text-green-700 text-3xl" />,
      title: "Leave Travel Allowance (LTA)",
      details: "Exemptions for travel expenses incurred within India.",
      link: "https://incometaxindia.gov.in/_layouts/15/dit/Pages/viewer.aspx?grp=Act&cname=CMSID&cval=102120000000087425&searchFilter=[{%22CrawledPropertyKey%22:1,%22Value%22:%22Act%22,%22SearchOperand%22:2},{%22CrawledPropertyKey%22:0,%22Value%22:%22Income-tax%20Act,%201961%22,%22SearchOperand%22:2},{%22CrawledPropertyKey%22:29,%22Value%22:%222024%20(No.%202)%22,%22SearchOperand%22:2}]&k=leave%20travel&IsDlg=0",
    },
    {
      icon: <FaUserTie className="text-green-700 text-3xl" />,
      title: "Standard Deduction",
      details: "Flat deduction of ₹50,000 for salaried employees.",
      link: "https://incometaxindia.gov.in/_layouts/15/dit/Pages/viewer.aspx?grp=Act&cname=CMSID&cval=102120000000086533&searchFilter=[{%22CrawledPropertyKey%22:1,%22Value%22:%22Act%22,%22SearchOperand%22:2},{%22CrawledPropertyKey%22:0,%22Value%22:%22Income-tax%20Act,%201961%22,%22SearchOperand%22:2},{%22CrawledPropertyKey%22:29,%22Value%22:%222024%20(No.%202)%22,%22SearchOperand%22:2}]&k=&IsDlg=0",
    },
  ];

  return (
    <div className="min-h-screen  flex flex-col items-center pb-12 pt-6">
      <div className="w-full max-w-screen bg-white p-10 shadow-xl rounded-xl">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-4">
          Tax-Saving Strategies 💰
        </h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Maximize your tax savings with these effective strategies.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategies.map((item, index) => (
            <div
              key={index}
              className="p-6 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-lg transition duration-300 transform hover:-translate-y-1 flex flex-col items-center text-center"
            >
              {item.icon}
              <h2 className="text-2xl font-semibold text-green-700 mt-3 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-700 mb-4">{item.details}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 flex items-center gap-2"
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
