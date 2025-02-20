import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export default function TaxCalculator() {
    const [income, setIncome] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [taxPayable, setTaxPayable] = useState("");
    const [educationCess, setEducationCess] = useState("");
    const navigate = useNavigate();

    const checkTaxPayable = () => {
        const incomeValue = parseFloat(income); // Convert input to number
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
            const TaxSaved = (taxPayable * 0.10) + 325000;
            setEducationCess(`₹${cess.toFixed(2)}`);
            setResponseMessage(`\n\n NPS:  ₹${(calculateTax + cess) * 0.10}, You can also invest in: Public provident fund, ELSS Mutual Fund and in NPS an aggregate of ₹1,50,000 maximum. \n\n\n\n If you have a home loan, claim ₹2,00,000 deduction on the interest paid under Section 24(b). \n Self & Family Health Insurance – ₹25,000
                , Parents’ Health Insurance (if senior citizens) – ₹50,000 , You can also save tax if you have any Education Loan interest.  \n`);
        }
        else if (incomeValue > 1600000 && incomeValue <= 2000000) {
            const taxableIncome = incomeValue - 1600000;
            const calculateTax = ((taxableIncome - 75000) * 0.20) + (400000 * 0.15) + (400000 * 0.10) + (400000 * 0.05);
            const cess = calculateTax * 0.04;
            setTaxPayable(`₹${(calculateTax + cess).toFixed(2)}`);
            setEducationCess(`₹${cess.toFixed(2)}`);
            setResponseMessage(`\n\n NPS:   ₹${(calculateTax + cess) * 0.10},  You can also invest in: Public provident fund, ELSS Mutual Fund and in NPS an aggregate of ₹1,50,000 maximum.  \n If you have a home loan, claim ₹2,00,000 deduction on the interest paid under Section 24(b). \n Self & Family Health Insurance – ₹25,000
                , Parents’ Health Insurance (if senior citizens) – ₹50,000 , You can also save tax if you have any Education Loan interest.`);
        }
        else if (incomeValue > 2000000 && incomeValue <= 2400000) {
            const taxableIncome = incomeValue - 2000000;
            const calculateTax = ((taxableIncome - 75000) * 0.25) + (400000 * 0.20) + (400000 * 0.15) + (400000 * 0.10) + (400000 * 0.05);
            const cess = calculateTax * 0.04;
            setTaxPayable(`₹${(calculateTax + cess).toFixed(2)}`);
            setEducationCess(`₹${cess.toFixed(2)}`);
            setResponseMessage(`\n\n NPS:   ₹${(calculateTax + cess) * 0.10}, You can also invest in: Public provident fund, ELSS Mutual Fund and in NPS an aggregate of ₹1,50,000 maximum. \n If you have a home loan, claim ₹2,00,000 deduction on the interest paid under Section 24(b). \n Self & Family Health Insurance – ₹25,000
                , Parents’ Health Insurance (if senior citizens) – ₹50,000 , You can also save tax if you have any Education Loan interest.`);
        }
        else if (incomeValue > 2400000) {
            const taxableIncome = incomeValue - 2400000;
            const calculateTax = ((taxableIncome - 75000) * 0.30) + (400000 * 0.25) + (400000 * 0.20) + (400000 * 0.15) + (400000 * 0.10) + (400000 * 0.05);
            const cess = calculateTax * 0.04;
            setTaxPayable(`₹${(calculateTax + cess).toFixed(2)}`);
            setEducationCess(`₹${cess.toFixed(2)}`);
            setResponseMessage(`\n\n  NPS:   ₹${(calculateTax + cess) * 0.10}, You can also invest in: Public provident fund, ELSS Mutual Fund and in NPS an aggregate of ₹1,50,000 maximum \n If you have a home loan, claim ₹2,00,000 deduction on the interest paid under Section 24(b). \n Self & Family Health Insurance – ₹25,000
                , Parents’ Health Insurance (if senior citizens) – ₹50,000 , You can also save tax if you have any Education Loan interest.`);
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
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Calculate My Tax
                    </button>
                </form>
                {taxPayable && <p className="text-black mt-4">Total Tax Payable (Health and education cess included): {taxPayable}</p>}
                {responseMessage && <p className="text-gray-600 pt-5"> <span className="font-semibold text-lg">You can save tax by investing in :</span> <br /> {responseMessage}</p>}
            </div>
        </div>
    );
}
