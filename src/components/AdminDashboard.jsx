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

export default function AdminDashboard() {
  const [userDetails, setUserDetails] = useState([]);
  const [expandedUserId, setExpandedUserId] = useState(null);
  const [file, setFile] = useState(null);
  const Token = sessionStorage.getItem("authToken");

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
                            {/* User Details and File Upload */}
                            <div className="mb-4">
                              <p><strong>Name:</strong> {user.name}</p>
                              <p><strong>Currency:</strong> {user.currency}</p>
                              <p><strong>Contribution:</strong> {user.contribution_amount}</p>
                              <p><strong>Start Date:</strong> {user.start_date}</p>
                            </div>
                            {/* <div className="flex flex-col md:flex-row md:items-center gap-4">
                              <input
                                type="file"
                                accept=".json,.csv"
                                onChange={handleFileChange}
                                className="border p-2 rounded w-full md:w-auto"
                              />
                              <button
                                onClick={() => handleUpload(user.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                              >
                                Upload CSV
                              </button>
                              <button
                                onClick={() => handleUpload(user.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                              >
                                Form Upload
                              </button>
                            </div> */}
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
    </>
  );
}
