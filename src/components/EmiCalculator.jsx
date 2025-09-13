import React, { useState } from "react";

const EmiCalculator = () => {
  const [price, setPrice] = useState(5000000); // default ₹50 Lakh
  const [downPayment, setDownPayment] = useState(500000); // default ₹5 Lakh
  const [rate, setRate] = useState(8.5); // annual interest rate in %
  const [years, setYears] = useState(20); // default 20 years
  const [emi, setEmi] = useState(null);
  const [totalCost, setTotalCost] = useState(null);

  const calculateEMI = () => {
    const loanAmount = price - downPayment;
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmount = emiValue * months;

    setEmi(Math.round(emiValue));
    setTotalCost(Math.round(totalAmount));
  };

  return (
    <div className="bg-white shadow-2xl p-6 rounded-2xl max-w-lg mx-auto mt-8 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">🏠 EMI & Cost Calculator</h2>

      <div className="space-y-4">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Property Price (₹)"
        />
        <input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Down Payment (₹)"
        />
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Interest Rate (%)"
        />
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Loan Tenure (Years)"
        />

        <button
          onClick={calculateEMI}
          className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 rounded-lg hover:from-green-600 hover:to-teal-600 hover:shadow-lg transition-all duration-300"
        >
          Calculate EMI
        </button>
      </div>

      {emi !== null && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner transition">
          <p className="text-lg font-semibold text-gray-700">Monthly EMI: ₹{emi.toLocaleString()}</p>
          <p className="text-lg font-semibold text-gray-700">
            Total Payment: ₹{totalCost.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default EmiCalculator;
