// import React, { useState, useEffect } from "react";
// import Navbar from "./Navbar";
// import Api from "../api/ApiIP";

// export default function AdminDashboard() {
//   const [userDetails, setUserDetails] = useState([]);
//   const Token = localStorage.getItem("authToken");

//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${Api}/api/v1/show_details`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${Token}`,
//         },
//       });

//       if (!response.ok) {
//         console.error("Failed response:", response);
//         return;
//       }

//       const data = await response.json();
//       setUserDetails(data);
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("Something went wrong. Please try again later.");
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <div className="bg-[#b61825] pt-32 md:pt-40 px-3 md:px-6 py-10">
//         <h1 className="text-4xl font-bold text-white mb-6 text-center">
//           Admin Dashboard
//         </h1>
//         <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto">
//           <h2 className="text-2xl font-semibold mb-4">User Management</h2>
//           <p className="text-gray-700">
//             This is where admin functionalities will be implemented.
//           </p>

//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse text-sm md:text-base">
//               <thead>
//                 <tr className="bg-gray-100">
//                   <th className="border p-2">Name</th>
//                   <th className="border p-2">Currency</th>
//                   <th className="border p-2">Contribution Amount</th>
//                   <th className="border p-2">Start Date</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {userDetails.length > 0 ? (
//                   userDetails.map((t, idx) => (
//                     <tr key={idx} className="text-center">
//                       <td className="border p-2">{t.name}</td>
//                       <td className="border p-2">{t.currency}</td>
//                       <td className="border p-2 font-bold">{t.contribution_amount}</td>
//                       <td className="border p-2 font-bold">{t.start_date}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="border p-2 text-center text-gray-500">
//                       No data available
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Api from "../api/ApiIP";
import AdminNavbar from "./AdminNavbar"
import CreateNotification from "./CreateNotification";

export default function AdminDashboard() {
  const [userDetails, setUserDetails] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [file, setFile] = useState(null);
  const Token = sessionStorage.getItem("authToken");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // Fetch users
  const fetchData = async () => {
    try {
      const response = await fetch(`${Api}/api/v1/show_details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");

      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong while fetching data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Toggle accordion
  const toggleExpand = (userId) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
    setFile(null); // Reset file when switching users
  };

  // Handle file change
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle file upload
  const handleUpload = async (userId) => {
    if (!file) return alert("Please select a file to upload!");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);

    try {
      const response = await fetch(`${Api}/api/v1/upload_user_file`, {
        method: "POST",
        headers: { Authorization: `Bearer ${Token}` },
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      alert("File uploaded successfully!");
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Upload failed. Please try again.");
    }
  };

  const [transactions, setTransactions] = useState([]);

  // Fetch Transactions
  const fetchTransactions = async () => {
    
    try {
      const response = await fetch(`${Api}/api/v1/transactions/${expandedUserId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        
      });

      if (!response.ok) throw new Error("Failed to fetch transactions");
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if(expandedUserId){
    fetchTransactions();
    }
  }, [expandedUserId]);


  const handleTransactionUpload = async () => {
    if (!file) return alert("Please select a file!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${Api}/api/v1/upload_transactions/${expandedUserId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${Token}` }, // keep token
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      alert("Transaction file uploaded!");
      fetchTransactions(); // reload after upload
    } catch (error) {
      console.error("Upload error:", error);
    }
  };




  return (
    <>
      <AdminNavbar />
      <div className="bg-[#b61825] pt-32 md:pt-40 px-3 md:px-6 py-10">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Admin Dashboard
        </h1>

        {/* ==== Users Table with Accordion ==== */}
        <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">User Management</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm md:text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Name</th>
                  
                  <th className="border p-2">Currency</th>
                  <th className="border p-2">Contribution Amount</th>
                  <th className="border p-2">Start Date</th>
                </tr>
              </thead>
              <tbody>
                {userDetails.length > 0 ? (
                  userDetails.map((user) => (
                    <React.Fragment key={user.id}>
                      <tr
                        className="text-center cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleExpand(user.id)}
                      >
                        <td className="border p-2">{user.name}</td>
                        
                        <td className="border p-2">{user.currency}</td>

                        <td className="border p-2 font-bold">{user.contribution_amount}</td>
                        <td className="border p-2 font-bold">{user.start_date}</td>
                      </tr>

                      {expandedUserId === user.id && (
                        <tr>
                          <td colSpan="4" className="border p-4 bg-gray-50">

                            <div className="mt-10 bg-white shadow-md rounded-xl p-6 max-w-6xl mx-auto">
                              {/* User Details and File Upload */}
                              <div className="mt-10 bg-white shadow-md rounded-xl p-6 max-w-6xl mx-auto">

                                <div className="flex items-center justify-between p-4 ">
                                  {/* Left side - Title */}
                                  <h2 className="text-2xl font-semibold text-gray-800">User Details</h2>

                                  {/* Right side - Notification Button */}
                                  <button
                                    onClick={togglePopup}
                                    className="p-2 rounded-full bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-600 transition-colors duration-200 focus:outline-none"
                                  >
                                    <i className="fas fa-bell text-2xl"></i>
                                  </button>
                                </div>
                                <div className="mb-4">
                                  <p><strong>Name:</strong> {user.name}</p>
                                  <p><strong>Currency:</strong> {user.currency}</p>
                                  <p><strong>Contribution:</strong> {user.contribution_amount}</p>
                                  <p><strong>Start Date:</strong> {user.start_date}</p>
                                  <p><strong>Email:</strong> {user.email}</p>
                                </div>
                              </div>

                              
                              <div className="mt-10 bg-white shadow-md rounded-xl p-6 max-w-6xl mx-auto">
                                <h2 className="text-2xl font-semibold mb-4">Transactions</h2>

                                <div className="flex gap-4 mb-4">
                                  <input type="file" accept=".csv" onChange={handleFileChange} />
                                  <button
                                    onClick={handleTransactionUpload}
                                    className="bg-green-600 text-white px-4 py-2 rounded"
                                  >
                                    Upload Transactions CSV
                                  </button>
                                </div>

                                <table className="w-full border-collapse text-sm md:text-base">
                                  <thead>
                                    <tr className="bg-gray-100">
                                      <th className="border p-2">Month</th>
                                      <th className="border p-2">Confirmation #</th>
                                      <th className="border p-2">Date</th>
                                      <th className="border p-2">From Account</th>
                                      <th className="border p-2">To Account</th>
                                      <th className="border p-2">Amount</th>
                                      <th className="border p-2">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {transactions.length > 0 ? (
                                      transactions.map((t, idx) => (
                                        <tr key={idx} className="text-center">
                                          <td className="border p-2">{t.month}</td>
                                          <td className="border p-2">{t.confirmation_number}</td>
                                          <td className="border p-2">{t.transaction_date}</td>
                                          <td className="border p-2">{t.from_account}</td>
                                          <td className="border p-2">{t.to_account}</td>
                                          <td className="border p-2">{t.amount}</td>
                                          <td className="border p-2">{t.status}</td>
                                        </tr>
                                      ))
                                    ) : (
                                      <tr>
                                        <td colSpan="7" className="border p-2 text-gray-500">
                                          No transactions yet
                                        </td>
                                      </tr>
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </div>

                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="border p-2 text-center text-gray-500">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Popup */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded shadow-lg w-126 relative">
            {/* Close button */}


            {/* Render the CreateNotification form */}
            <CreateNotification  user={expandedUserId} onCencel={()=> setIsPopupOpen(false)}/>
          </div>
        </div>
      )}
    </>
  );
}
