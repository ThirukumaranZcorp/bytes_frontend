import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import navigate hook
import AdminNavbar from "./AdminNavbar";
import Api from "../api/ApiIP";


const AdminSettings = () => {
  const [value, setValue] = useState(3);
  const navigate = useNavigate(); // ✅ initialize navigate
  const Token = sessionStorage.getItem("authToken");

    const fetchPercentageData =  async () => {
        try {
            const response = await fetch(`${Api}/api/v1/get_change_trader_fee`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Token}`,
            },
            });

            const data = await response.json();

            if (!response.ok) {
            console.error("Saving failed:", data);
            alert("Saving failed: " + (data.error || "Unknown error"));
            return;
            }

            // ✅ Success popup
            // alert("✅ Fee updated successfully to " + data.fee + "%");
            setValue(data.fee)

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Something went wrong while fetching data.");
        }
    }

    useEffect(()=>{
        fetchPercentageData()
    },[])

    const handleChangeFee = async () => {
        try {
            const response = await fetch(`${Api}/api/v1/change_trader_fee`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify({ fee: value }),
            });

            const data = await response.json();

            if (!response.ok) {
            console.error("Saving failed:", data);
            alert("Saving failed: " + (data.error || "Unknown error"));
            return;
            }

            // ✅ Success popup
            alert("✅ Fee updated successfully to " + data.fee + "%");

        } catch (error) {
            console.error("Error fetching data:", error);
            alert("Something went wrong while fetching data.");
        }
    };




  return (
    <>
      <AdminNavbar />

      <div className="bg-[#b61825] min-h-screen pt-32 md:pt-40 px-4 md:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-4xl font-bold text-white text-center w-full">
              Settings
            </h1>
          </div>

          {/* Back Button */}
          <div className="flex justify-start mb-6">
            <button
              onClick={() => navigate("/admin")}
              className="
                flex items-center gap-2
                bg-white text-[#b61825] font-medium 
                px-4 py-2 rounded-lg shadow-md 
                hover:bg-blue-600 hover:text-white 
                hover:shadow-lg hover:scale-105 transition-all duration-300
              "
            >
              ← Back
            </button>
          </div>

          {/* Settings Card */}
          <div className="bg-white shadow-lg rounded-2xl p-8 space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
              User Settings
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              {/* Text Section */}
              <div className="text-center md:text-left">
                <h3 className="text-lg font-medium text-gray-900">
                  Trader Fee (%)
                </h3>
              </div>

              {/* Range Input */}
              <div className="flex flex-col items-center md:items-start space-y-3">
                <label
                  htmlFor="percentage"
                  className="text-sm font-medium text-gray-700"
                >
                  Percentage:{" "}
                  <span className="font-semibold text-blue-600">{value}%</span>
                </label>

                <input
                  id="percentage"
                  type="range"
                  min="3"
                  max="6"
                  step="0.1"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="
                    w-64 h-2 appearance-none rounded-full cursor-pointer
                    bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600
                    transition-all duration-300
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-5 
                    [&::-webkit-slider-thumb]:h-5 
                    [&::-webkit-slider-thumb]:bg-white 
                    [&::-webkit-slider-thumb]:border 
                    [&::-webkit-slider-thumb]:border-gray-300 
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:shadow-md 
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:transition-all
                    [&::-webkit-slider-thumb]:hover:scale-110
                  "
                />
              </div>

              {/* Save Button */}
              <button
                onClick={handleChangeFee}
                className="
                  bg-blue-600 hover:bg-blue-700 
                  text-white font-medium px-5 py-2.5 rounded-lg
                  shadow-md transition-all duration-300
                  hover:shadow-lg hover:scale-105
                "
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
