import React, { useState } from "react";
import Api from "../api/ApiIP";

const ChangeContributionAmount = ({ userId }) => {
  const [message, setMessage] = useState("");
  const Token = sessionStorage.getItem("authToken");
  const [capital, setCapital] = useState()

  const handleUpdate = async () => {
    setMessage("");
    try {
      const res = await fetch(`${Api}/api/v1/admin_notifications/${userId}/update_contribution_amount`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({ capital: capital }),
      });

      const data = await res.json();
      setMessage(res.ok ? data.message : data.error);
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Change Contribution Amount
      </h3>

        

      <div className="flex justify-center items-center gap-3">
            <input
                type="number"
                // placeholder="ENTER VALUE HERE"
                className="w-full border rounded-lg p-2 mb-3 border-red-500 placeholder:font-bold"
                value={capital}
                onChange={(e) => {
                const inputValue = parseFloat(e.target.value);
                if (inputValue <= 100000000) {
                    setCapital(inputValue);
                }
                }}
                max={100000000}
                style={{
                animation: "breathePlaceholder 1.5s ease-in-out infinite",
                }}
            />

            <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg shadow"
            >
            Update
            </button>
      </div>

        {message && (
            <p
            className={`mt-4 text-sm font-medium ${
                message.toLowerCase().includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
            >
            {message}
            </p>
      )}
    </div>
  );
};

export default ChangeContributionAmount;
