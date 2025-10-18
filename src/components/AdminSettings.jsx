// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ import navigate hook
// import AdminNavbar from "./AdminNavbar";
// import Api from "../api/ApiIP";


// const AdminSettings = () => {
//   const [value, setValue] = useState(3);
//   const [min , setMIn] = useState(4);
//   const [max , setMax] = useState(5);
//   const navigate = useNavigate(); // ✅ initialize navigate
//   const Token = sessionStorage.getItem("authToken");
//   const [userDetails, setUserDetails] = useState([]);
//   const [expandedUserId, setExpandedUserId] = useState(null);

//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${Api}/api/v1/show_details`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${Token}`,
//           },
//         });

//         if (!response.ok) throw new Error("Failed to fetch users");

//         const data = await response.json();
//         setUserDetails(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         alert("Something went wrong while fetching data.");
//       }
//     };

//     const fetchPercentageData =  async () => {
//         try {
//             const response = await fetch(`${Api}/api/v1/get_change_trader_fee`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 Authorization: `Bearer ${Token}`,
//             },
//             });

//             const data = await response.json();

//             if (!response.ok) {
//             console.error("Saving failed:", data);
//             alert("Saving failed: " + (data.error || "Unknown error"));
//             return;
//             }

//             // ✅ Success popup
//             // alert("✅ Fee updated successfully to " + data.fee + "%");
//             setValue(data.fee || 0)
//             setMIn(data.min || 0)
//             setMax(data.max || 0)

//         } catch (error) {
//             console.error("Error fetching data:", error);
//             alert("Something went wrong while fetching data.");
//         }
//     }

//     useEffect(()=>{
//         fetchPercentageData()
//         fetchData();
//     },[])

//     const handleChangeFee = async () => {
//         try {
//             const response = await fetch(`${Api}/api/v1/change_trader_fee`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 Authorization: `Bearer ${Token}`,
//             },
//             body: JSON.stringify({ fee: value }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//             console.error("Saving failed:", data);
//             alert("Saving failed: " + (data.error || "Unknown error"));
//             return;
//             }

//             // ✅ Success popup
//             alert("✅ Fee updated successfully to " + data.fee + "%");

//         } catch (error) {
//             console.error("Error fetching data:", error);
//             alert("Something went wrong while fetching data.");
//         }
//     };

//     const handleChangemin = async () => {
//       try {
//             const response = await fetch(`${Api}/api/v1/change_trader_min`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 Authorization: `Bearer ${Token}`,
//             },
//             body: JSON.stringify({ min: min }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//             console.error("Saving failed:", data);
//             alert("Saving failed: " + (data.error || "Unknown error"));
//             return;
//             }

//             // ✅ Success popup
//             alert("✅ Min value updated successfully to " + data.min + "%");

//         } catch (error) {
//             console.error("Error fetching data:", error);
//             alert("Something went wrong while fetching data.");
//         }

//     }


//     const handleChangemax = async () => {
//       try {
//             const response = await fetch(`${Api}/api/v1/change_trader_max`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 Accept: "application/json",
//                 Authorization: `Bearer ${Token}`,
//             },
//             body: JSON.stringify({ max: max }),
//             });

//             const data = await response.json();

//             if (!response.ok) {
//             console.error("Saving failed:", data);
//             alert("Saving failed: " + (data.error || "Unknown error"));
//             return;
//             }

//             // ✅ Success popup
//             alert("✅ Max value updated successfully to " + data.max + "%");

//         } catch (error) {
//             console.error("Error fetching data:", error);
//             alert("Something went wrong while fetching data.");
//         }

//     }
//     const toggleExpand = (userId , currency) => {
//       setExpandedUserId(expandedUserId === userId ? null : userId);
//     };




//   return (
//     <>
//       <AdminNavbar />

//       <div className="bg-[#b61825] min-h-screen pt-32 md:pt-40 px-4 md:px-8 py-10">
//         <div className="max-w-3xl mx-auto">
//           {/* Page Header */}
//           <div className="flex items-center justify-between mb-10">
//             <h1 className="text-4xl font-bold text-white text-center w-full">
//               Settings
//             </h1>
//           </div>

//           {/* Back Button */}
//           <div className="flex justify-start mb-6">
//             <button
//               onClick={() => navigate("/admin")}
//               className="
//                 flex items-center gap-2
//                 bg-white text-[#b61825] font-medium 
//                 px-4 py-2 rounded-lg shadow-md 
//                 hover:bg-blue-600 hover:text-white 
//                 hover:shadow-lg hover:scale-105 transition-all duration-300
//               "
//             >
//               ← Back
//             </button>
//           </div>

//           {/* Settings Card */}
//           <div className="bg-white shadow-lg rounded-2xl p-8 space-y-8">
//             <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3">
//               User Settings
//             </h2>

//             <table className="w-full border-collapse text-sm md:text-base">
//                 <thead>
//                   <tr className="bg-gray-100">
//                     <th className="border p-2">Name</th>
//                     <th className="border p-2">Currency</th>
//                     <th className="border p-2">Contribution Amount</th>
//                     <th className="border p-2">Start Date</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {userDetails.length > 0 ? (
//                     userDetails.map((user) => (
//                       <React.Fragment key={user.id}>
//                         <tr
//                           className="text-center cursor-pointer hover:bg-gray-50"
//                           onClick={() => toggleExpand(user.id , user.currency)}
//                         >
//                           <td className="border p-2">{user.name}</td>
                          
//                           <td className="border p-2">{user.currency}</td>
  
//                           <td className="border p-2 font-bold">{user.contribution_amount}</td>
//                           <td className="border p-2 font-bold">{user.start_date}</td>
//                         </tr>
  
//                         {expandedUserId === user.id && (
//                           <tr>
//                             <td colSpan="4" className="border p-4 bg-gray-50">
//                               <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
//                                 {/* Text Section */}
//                                 <div className="text-center md:text-left">
//                                   <h3 className="text-lg font-medium text-gray-900">
//                                     Trader Fee (%)
//                                   </h3>
//                                 </div>

//                                 {/* Range Input */}
//                                 <div className="flex flex-col items-center md:items-start space-y-3">
//                                   <label
//                                     htmlFor="percentage"
//                                     className="text-sm font-medium text-gray-700"
//                                   >
//                                     Percentage:{" "}
//                                     <span className="font-semibold text-blue-600">{value}%</span>
//                                   </label>

//                                   <input
//                                     id="percentage"
//                                     type="range"
//                                     min="3"
//                                     max="6"
//                                     step="0.1"
//                                     value={value}
//                                     onChange={(e) => setValue(e.target.value)}
//                                     className="
//                                       w-64 h-2 appearance-none rounded-full cursor-pointer
//                                       bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600
//                                       transition-all duration-300
//                                       [&::-webkit-slider-thumb]:appearance-none 
//                                       [&::-webkit-slider-thumb]:w-5 
//                                       [&::-webkit-slider-thumb]:h-5 
//                                       [&::-webkit-slider-thumb]:bg-white 
//                                       [&::-webkit-slider-thumb]:border 
//                                       [&::-webkit-slider-thumb]:border-gray-300 
//                                       [&::-webkit-slider-thumb]:rounded-full
//                                       [&::-webkit-slider-thumb]:shadow-md 
//                                       [&::-webkit-slider-thumb]:cursor-pointer
//                                       [&::-webkit-slider-thumb]:transition-all
//                                       [&::-webkit-slider-thumb]:hover:scale-110
//                                     "
//                                   />
//                                 </div>

//                                 {/* Save Button */}
//                                 <button
//                                   onClick={handleChangeFee}
//                                   className="
//                                     bg-blue-600 hover:bg-blue-700 
//                                     text-white font-medium px-5 py-2.5 rounded-lg
//                                     shadow-md transition-all duration-300
//                                     hover:shadow-lg hover:scale-105
//                                   "
//                                 >
//                                   Save
//                                 </button>
//                               </div>
//                               <h2 className="text-2xl font-semibold text-gray-800">
//                                 Computed Tier & Results
//                               </h2>
//                               <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0 ">
//                                 {/* Text Section */}
//                                 <div className="text-center md:text-left">
//                                   <h3 className="text-lg font-medium text-gray-900">
//                                     Min (%)
//                                   </h3>
//                                 </div>

//                                 {/* Range Input */}
//                                 <div className="flex flex-col items-center md:items-start space-y-3">
//                                   <label
//                                     htmlFor="percentage"
//                                     className="text-sm font-medium text-gray-700"
//                                   >
//                                     Percentage:{" "}
//                                     <span className="font-semibold text-blue-600">{min}%</span>
//                                   </label>

//                                   <input
//                                     id="percentage"
//                                     type="range"
//                                     min="2"
//                                     max="6"
//                                     step="1"
//                                     value={min}
//                                     onChange={(e) => setMIn(e.target.value)}
//                                     className="
//                                       w-64 h-2 appearance-none rounded-full cursor-pointer
//                                       bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600
//                                       transition-all duration-300
//                                       [&::-webkit-slider-thumb]:appearance-none 
//                                       [&::-webkit-slider-thumb]:w-5 
//                                       [&::-webkit-slider-thumb]:h-5 
//                                       [&::-webkit-slider-thumb]:bg-white 
//                                       [&::-webkit-slider-thumb]:border 
//                                       [&::-webkit-slider-thumb]:border-gray-300 
//                                       [&::-webkit-slider-thumb]:rounded-full
//                                       [&::-webkit-slider-thumb]:shadow-md 
//                                       [&::-webkit-slider-thumb]:cursor-pointer
//                                       [&::-webkit-slider-thumb]:transition-all
//                                       [&::-webkit-slider-thumb]:hover:scale-110
//                                     "
//                                   />
//                                 </div>

//                                 {/* Save Button */}
//                                 <button
//                                   onClick={handleChangemin}
//                                   className="
//                                     bg-blue-600 hover:bg-blue-700 
//                                     text-white font-medium px-5 py-2.5 rounded-lg
//                                     shadow-md transition-all duration-300
//                                     hover:shadow-lg hover:scale-105
//                                   "
//                                 >
//                                   Save
//                                 </button>
//                               </div>

//                               <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
//                                   {/* Text Section */}
//                                   <div className="text-center md:text-left">
//                                     <h3 className="text-lg font-medium text-gray-900">
//                                       Max (%)
//                                     </h3>
//                                   </div>

//                                   {/* Range Input */}
//                                   <div className="flex flex-col items-center md:items-start space-y-3">
//                                     <label
//                                       htmlFor="percentage"
//                                       className="text-sm font-medium text-gray-700"
//                                     >
//                                       Percentage:{" "}
//                                       <span className="font-semibold text-blue-600">{max}%</span>
//                                     </label>

//                                     <input
//                                       id="percentage"
//                                       type="range"
//                                       min="3"
//                                       max="10"
//                                       step="1"
//                                       value={max}
//                                       onChange={(e) => setMax(e.target.value)}
//                                       className="
//                                         w-64 h-2 appearance-none rounded-full cursor-pointer
//                                         bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600
//                                         transition-all duration-300
//                                         [&::-webkit-slider-thumb]:appearance-none 
//                                         [&::-webkit-slider-thumb]:w-5 
//                                         [&::-webkit-slider-thumb]:h-5 
//                                         [&::-webkit-slider-thumb]:bg-white 
//                                         [&::-webkit-slider-thumb]:border 
//                                         [&::-webkit-slider-thumb]:border-gray-300 
//                                         [&::-webkit-slider-thumb]:rounded-full
//                                         [&::-webkit-slider-thumb]:shadow-md 
//                                         [&::-webkit-slider-thumb]:cursor-pointer
//                                         [&::-webkit-slider-thumb]:transition-all
//                                         [&::-webkit-slider-thumb]:hover:scale-110
//                                       "
//                                     />
//                                   </div>

//                                   {/* Save Button */}
//                                   <button
//                                     onClick={handleChangemax}
//                                     className="
//                                       bg-blue-600 hover:bg-blue-700 
//                                       text-white font-medium px-5 py-2.5 rounded-lg
//                                       shadow-md transition-all duration-300
//                                       hover:shadow-lg hover:scale-105
//                                     "
//                                   >
//                                     Save
//                                   </button>
//                               </div>
//                             </td>
//                           </tr>
//                         )}
//                       </React.Fragment>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan="4" className="border p-2 text-center text-gray-500">
//                         No data available
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminSettings;
import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Api from "../api/ApiIP";

const AdminSettings = () => {
  const [value, setValue] = useState(3);
  const [min, setMin] = useState(4);
  const [max, setMax] = useState(5);
  const [userDetails, setUserDetails] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const Token = sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await fetch(`${Api}/api/v1/show_details`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch users");
      setUserDetails(data);
    } catch (err) {
      alert("Error fetching user details.");
      console.error(err);
    }
  };

  const fetchPercentageData = async (userId) => {
    try {
      const response = await fetch(`${Api}/api/v1/get_change_trader_fee_admin`, {
        method: "POST", // ✅ must use POST when sending a body
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({ userId }), // ✅ body must be outside headers
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch data");

      // ✅ assuming Rails returns dashboard object or array
      const first = Array.isArray(data) ? data[0] : data;

      setValue(first.fee || 0);
      setMin(first.min || 0);
      setMax(first.max || 0);
    } catch (err) {
      alert("Error fetching trader fee data.");
      console.error(err);
    }
  };


  useEffect(() => {
    // fetchPercentageData();
    fetchData();
  }, []);

  const handleSave = async (type, val) => {
    const endpoint = {
      fee: "change_trader_fee",
      min: "change_trader_min",
      max: "change_trader_max",
    }[type];

    try {
      const response = await fetch(`${Api}/api/v1/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify({ [type]: val, userId: expandedUserId }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to save data");

      // ✅ access via data.data
      setValue(data.data.fee);
      setMin(data.data.min);
      setMax(data.data.max);

      alert(`✅ ${type.toUpperCase()} updated successfully to ${val}%`);
    } catch (err) {
      alert("Error saving data.");
      console.error(err);
    }
  };


  const toggleExpand = (id) => {
    setExpandedUserId(expandedUserId === id ? null : id);
    fetchPercentageData(id)
  };

  return (
    <>
      <AdminNavbar />

      <div className="bg-[#b61825] min-h-screen pt-28 md:pt-36 px-4 md:px-10 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white text-center w-full">
              Admin Settings
            </h1>
          </div>

          {/* Back Button */}
          <div className="mb-8">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 bg-white text-[#b61825] font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-[#b61825] hover:text-white transition-all duration-300"
            >
              ← Back
            </button>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
            <h2 className="text-2xl font-semibold text-gray-800 border-b pb-3 mb-6">
              User Settings
            </h2>

            {/* User Table */}
            <div className="overflow-x-auto">
              <table className="w-full border text-sm md:text-base">
                <thead>
                  <tr className="bg-gray-100 text-gray-800 font-semibold">
                    <th className="border p-3 text-left">Name</th>
                    <th className="border p-3 text-left">Currency</th>
                    <th className="border p-3 text-center">Contribution</th>
                    <th className="border p-3 text-center">Start Date</th>
                  </tr>
                </thead>
                <tbody>
                  {userDetails.length > 0 ? (
                    userDetails.map((user) => (
                      <React.Fragment key={user.id}>
                        <tr
                          onClick={() => toggleExpand(user.id)}
                          className={`cursor-pointer ${
                            expandedUserId === user.id
                              ? "bg-gray-50"
                              : "hover:bg-gray-50"
                          }`}
                        >
                          <td className="border p-3">{user.name}</td>
                          <td className="border p-3">{user.currency}</td>
                          <td className="border p-3 text-center font-semibold text-gray-700">
                            {user.contribution_amount}
                          </td>
                          <td className="border p-3 text-center text-gray-600">
                            {user.start_date}
                          </td>
                        </tr>

                        {expandedUserId === user.id && (
                          <tr>
                            <td colSpan="4" className="border p-5 bg-gray-50">
                              <div className="grid md:grid-cols-3 gap-6">
                                {/* Fee Card */}
                                <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                                  <h3 className="font-semibold text-gray-800 mb-2">
                                    Trader Fee (%)
                                  </h3>
                                  <input
                                    type="range"
                                    min="3"
                                    max="6"
                                    step="0.1"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    className="w-full accent-[#b61825]"
                                  />
                                  <div className="flex justify-between mt-3">
                                    <span className="font-medium text-blue-600">{value}%</span>
                                    <button
                                      onClick={() => handleSave("fee", value)}
                                      className="bg-[#b61825] text-white px-4 py-1.5 rounded-lg hover:bg-[#a01520] transition"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>

                                {/* Min Card */}
                                <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                                  <h3 className="font-semibold text-gray-800 mb-2">
                                    Min (%)
                                  </h3>
                                  <input
                                    type="range"
                                    min="2"
                                    max="6"
                                    step="1"
                                    value={min}
                                    onChange={(e) => setMin(e.target.value)}
                                    className="w-full accent-green-500"
                                  />
                                  <div className="flex justify-between mt-3">
                                    <span className="font-medium text-green-600">{min}%</span>
                                    <button
                                      onClick={() => handleSave("min", min)}
                                      className="bg-green-600 text-white px-4 py-1.5 rounded-lg hover:bg-green-700 transition"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>

                                {/* Max Card */}
                                <div className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition">
                                  <h3 className="font-semibold text-gray-800 mb-2">
                                    Max (%)
                                  </h3>
                                  <input
                                    type="range"
                                    min="3"
                                    max="10"
                                    step="1"
                                    value={max}
                                    onChange={(e) => setMax(e.target.value)}
                                    className="w-full accent-orange-500"
                                  />
                                  <div className="flex justify-between mt-3">
                                    <span className="font-medium text-orange-600">{max}%</span>
                                    <button
                                      onClick={() => handleSave("max", max)}
                                      className="bg-orange-500 text-white px-4 py-1.5 rounded-lg hover:bg-orange-600 transition"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="border p-4 text-center text-gray-500 italic"
                      >
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
