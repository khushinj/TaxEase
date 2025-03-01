import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaxCalculator() {
    const [income, setIncome] = useState("");
    const [investmentBreakdown, setInvestmentBreakdown] = useState(null);
    const [responseMessage, setResponseMessage] = useState("");
    const [taxPayable, setTaxPayable] = useState("");
    const [educationCess, setEducationCess] = useState("");
    const navigate = useNavigate();

    const checkTaxPayable = () => {
        const incomeValue = parseFloat(income);
        if (isNaN(incomeValue) || incomeValue < 0) {
            setResponseMessage("Please enter a valid income.");
            setTaxPayable("");
            setEducationCess("");
            return;
        }

        if (incomeValue <= 1275000) {
            setResponseMessage("No tax payable till ₹12,75,000.");
            setTaxPayable("₹0");
            setEducationCess("₹0");
        }
        else if (incomeValue > 1275000 && incomeValue <= 1300000) {
            const calculateTax = 1300000 - incomeValue;
            setTaxPayable(`₹${calculateTax}`);
            setResponseMessage("You need to earn ₹13,00,000 to start paying tax.");
            setEducationCess("₹0");
        }
        else if (incomeValue > 1300000 && incomeValue <= 1600000) {
            const taxableIncome = incomeValue - 1275000;
            const calculateTax = (taxableIncome * 0.15) + (400000 * 0.10) + (400000 * 0.05);
            const cess = calculateTax * 0.04;
            setTaxPayable(`₹${(calculateTax + cess).toFixed(2)}`);
            // const TaxSaved = (taxPayable * 0.10) + 325000;
            setEducationCess(`₹${cess.toFixed(2)}`);
            setResponseMessage(`\n\n NPS:  ₹${(calculateTax + cess) * 0.10}, You can also invest in: Public provident fund, ELSS Mutual Fund and in NPS an aggregate of ₹1,50,000 maximum. \n\n\n\n If you have a home loan, claim ₹2,00,000 deduction on the interest paid under Section 24(b). \n Self & Family Health Insurance – ₹25,000
                , Parents’ Health Insurance (if senior citizens) – ₹50,000 , You can also save tax if you have any Education Loan interest.  \n`);
            setInvestmentBreakdown({
                PPF: 150000,
                ELSS: (incomeValue * 0.05).toFixed(2), // Example: 5% of income
                NPS: (incomeValue * 0.10).toFixed(2), // Example: 10% of income
                HomeLoan: 200000, // Fixed deduction
                HealthInsurance: incomeValue > 2000000 ? 75000 : 25000, // Higher deduction for higher income
                EducationLoan: incomeValue > 1800000 ? 50000 : 0
            });

        }
        else if (incomeValue > 1600000 && incomeValue <= 2000000) {
            const taxableIncome = incomeValue - 1600000;
            const calculateTax = ((taxableIncome - 75000) * 0.20) + (400000 * 0.15) + (400000 * 0.10) + (400000 * 0.05);
            const cess = calculateTax * 0.04;
            setTaxPayable(`₹${(calculateTax + cess).toFixed(2)}`);
            setEducationCess(`₹${cess.toFixed(2)}`);
            setResponseMessage(`\n\n NPS:   ₹${(calculateTax + cess) * 0.10},  You can also invest in: Public provident fund, ELSS Mutual Fund and in NPS an aggregate of ₹1,50,000 maximum.  \n If you have a home loan, claim ₹2,00,000 deduction on the interest paid under Section 24(b). \n Self & Family Health Insurance – ₹25,000
                , Parents’ Health Insurance (if senior citizens) – ₹50,000 , You can also save tax if you have any Education Loan interest.`);
            setInvestmentBreakdown({
                PPF: 150000,
                ELSS: (incomeValue * 0.05).toFixed(2), // Example: 5% of income
                NPS: (incomeValue * 0.10).toFixed(2), // Example: 10% of income
                HomeLoan: 200000, // Fixed deduction
                HealthInsurance: incomeValue > 2000000 ? 75000 : 25000, // Higher deduction for higher income
                EducationLoan: incomeValue > 1800000 ? 50000 : 0
            });

        }
        else if (incomeValue > 2000000 && incomeValue <= 2400000) {
            const taxableIncome = incomeValue - 2000000;
            const calculateTax = ((taxableIncome - 75000) * 0.25) + (400000 * 0.20) + (400000 * 0.15) + (400000 * 0.10) + (400000 * 0.05);
            const cess = calculateTax * 0.04;
            setTaxPayable(`₹${(calculateTax + cess).toFixed(2)}`);
            setEducationCess(`₹${cess.toFixed(2)}`);
            setResponseMessage(`\n\n NPS:   ₹${(calculateTax + cess) * 0.10}, You can also invest in: Public provident fund, ELSS Mutual Fund and in NPS an aggregate of ₹1,50,000 maximum. \n If you have a home loan, claim ₹2,00,000 deduction on the interest paid under Section 24(b). \n Self & Family Health Insurance – ₹25,000
                , Parents’ Health Insurance (if senior citizens) – ₹50,000 , You can also save tax if you have any Education Loan interest.`);
            setInvestmentBreakdown({
                PPF: 150000,
                ELSS: (incomeValue * 0.05).toFixed(2), // Example: 5% of income
                NPS: (incomeValue * 0.10).toFixed(2), // Example: 10% of income
                HomeLoan: 200000, // Fixed deduction
                HealthInsurance: incomeValue > 2000000 ? 75000 : 25000, // Higher deduction for higher income
                EducationLoan: incomeValue > 1800000 ? 50000 : 0
            });

        }
        else if (incomeValue > 2400000) {
            const taxableIncome = incomeValue - 2400000;
            const calculateTax = ((taxableIncome - 75000) * 0.30) + (400000 * 0.25) + (400000 * 0.20) + (400000 * 0.15) + (400000 * 0.10) + (400000 * 0.05);
            const cess = calculateTax * 0.04;
            setTaxPayable(`₹${(calculateTax + cess).toFixed(2)}`);
            setEducationCess(`₹${cess.toFixed(2)}`);
            setResponseMessage(`\n\n  NPS:   ₹${(calculateTax + cess) * 0.10}, You can also invest in: Public provident fund, ELSS Mutual Fund and in NPS an aggregate of ₹1,50,000 maximum \n If you have a home loan, claim ₹2,00,000 deduction on the interest paid under Section 24(b). \n Self & Family Health Insurance – ₹25,000
                , Parents’ Health Insurance (if senior citizens) – ₹50,000 , You can also save tax if you have any Education Loan interest.`);
            setInvestmentBreakdown({
                PPF: 150000,
                ELSS: (incomeValue * 0.05).toFixed(2), // Example: 5% of income
                NPS: (incomeValue * 0.10).toFixed(2), // Example: 10% of income
                HomeLoan: 200000, // Fixed deduction
                HealthInsurance: incomeValue > 2000000 ? 75000 : 25000, // Higher deduction for higher income
                EducationLoan: incomeValue > 1800000 ? 50000 : 0
            });

        }
        else {
            setResponseMessage("No condition written for this range.");
            setTaxPayable("N/A");
            setEducationCess("N/A");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        checkTaxPayable();
    };

    return (
        <div>
            <p className="text-left ml-8 mt-8 cursor-pointer flex items-center" onClick={() => navigate('/')} > <IoChevronBack /> Back</p>
            <div className="max-w-md mx-auto flex flex-col justify-center items-center p-6 bg-white shadow-lg mt-[4%] border  rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Tax Saving Calculator</h2>
                <form onSubmit={handleSubmit}>
                    <label className="block mb-2 font-medium">Enter Your Income:</label>
                    <input
                        type="number"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        className="w-full p-2 border rounded mb-4"
                        placeholder="Enter your income"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 text-white  p-2 rounded hover:bg-blue-700"
                    >
                        Calculate My Tax
                    </button>
                </form>
                {taxPayable && <p className="text-black mt-4">Total Tax Payable (Health and education cess included): {taxPayable}</p>}
                {responseMessage &&
                    <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg border rounded-lg text-center">
                        <p className="text-gray-600 py-5 text-left"> <span className="font-semibold text-lg">You can save tax by investing in :</span> <br /> {responseMessage}</p>
                        {/* {investmentBreakdown && (
                            <div className="max-w-md mx-auto mt-6 p-6 bg-white shadow-lg border rounded-lg text-center">
                                <h3 className="text-xl font-bold mb-4">Personalized Investment Plan</h3>
                                <ul className="text-left">
                                    <li><strong>PPF:</strong> ₹{investmentBreakdown.PPF}</li>
                                    <li><strong>ELSS Mutual Fund:</strong> ₹{investmentBreakdown.ELSS}</li>
                                    <li><strong>NPS:</strong> ₹{investmentBreakdown.NPS}</li>
                                    <li><strong>Home Loan Deduction:</strong> ₹{investmentBreakdown.HomeLoan}</li>
                                    <li><strong>Health Insurance:</strong> ₹{investmentBreakdown.HealthInsurance}</li>
                                    {investmentBreakdown.EducationLoan > 0 && (
                                        <li><strong>Education Loan Interest:</strong> ₹{investmentBreakdown.EducationLoan}</li>
                                    )}
                                </ul>
                            </div>
                        )} */}

                        <h3 className="text-xl font-bold mb-4">Tax Breakdown</h3>
                        <Pie data={{
                            labels: ["Tax", "Cess", "Remaining Income"],
                            datasets: [{
                                data: [
                                    parseFloat(taxPayable.replace(/[₹,]/g, "")) || 0,
                                    parseFloat(educationCess.replace(/[₹,]/g, "")) || 0,
                                    parseFloat(income) || 0
                                ],
                                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                            }]
                        }} />

                    </div>}
            </div>
        </div>
    );
}
