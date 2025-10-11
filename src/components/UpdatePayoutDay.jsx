import React, { useState } from "react";
import Api from "../api/ApiIP";

const UpdatePayoutDay = ({ userId }) => {
  const [day, setDay] = useState(1);
  const [message, setMessage] = useState("");
  const Token = sessionStorage.getItem("authToken");

  const handleUpdate = async () => {
    setMessage("");
    try {
      const res = await fetch(`${Api}/api/v1/admin_notifications/${userId}/update_payout_day`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({ payout_day: day }),
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
        Update Payout Date
      </h3>

      <p className="text-gray-500 mb-6">
        Choose a new payout day for this user (1–28).
      </p>

      <div className="flex justify-center items-center gap-3">
        <input
          type="number"
          min="1"
          max="28"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg w-24 text-center focus:ring-2 focus:ring-blue-500 focus:outline-none"
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

export default UpdatePayoutDay;
