// import React, { useEffect, useState } from "react";
// import Api from "../api/ApiIP";
// import AdminNavbar from "./AdminNavbar"
// import { useNavigate } from "react-router-dom";


// const AdminContributions = () => {
//   const [contributions, setContributions] = useState([]);
//   const Token = sessionStorage.getItem("authToken");
//   const navigate = useNavigate();

//   const fetchContributions = async () => {
//     const res = await fetch(`${Api}/api/v1/contributions`, {
//       headers: {
//         Authorization: `Bearer ${Token}`,
//         Accept: "application/json",
//       },
//     });
//     const data = await res.json();
//     console.log("----------data----------",data.data)
//     setContributions(data);
//   };

//   const handleApprove = async (id) => {
//     await fetch(`${Api}/api/v1/contributions/${id}/approve`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${Token}`,
//         Accept: "application/json",
//       },
//     });
//     alert("Approved!");
//     fetchContributions();
//   };

//   const handleReject = async (id) => {
//     await fetch(`${Api}/api/v1/contributions/${id}/reject`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${Token}`,
//         Accept: "application/json",
//       },
//     });
//     alert("Rejected!");
//     fetchContributions();
//   };

//   useEffect(() => {
//     fetchContributions();
//   }, []);

//   return (
//     <>
//         <AdminNavbar />
//         <div className="p-6 pt-32 md:pt-40 px-3 md:px-6 py-10">
//             <div className="flex items-center justify-between mb-6">
//                 <h1 className="text-3xl md:text-4xl font-bold text-white text-center w-full">
//                     Manage Contributions
//                 </h1>
//             </div>

            



//             <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto">
//                 {/* Back Button */}
//                 <div className="mb-8">
//                     <button
//                     onClick={() => navigate("/admin")}
//                     className="flex items-center gap-2 bg-[#b61825] text-white font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
//                     >
//                     ← Back
//                     </button>
//                 </div>

//                 <table className="w-full border">
//                     <thead>
//                     <tr className="bg-gray-100">

//                         <th className="p-2">Name</th>
//                         <th className="p-2">Email</th>
//                         <th className="p-2">Current Contribution</th>
//                         <th className="p-2">User ID</th>
//                         <th className="p-2">Amount</th>
//                         <th className="p-2">Currency</th>
//                         <th className="p-2">Receipt</th>
//                         <th className="p-2">Status</th>
//                         <th className="p-2">Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {contributions.map((c) => (
//                         <tr key={c.id} className="border-t">
//                         <td className="p-2 text-center">{c.name}</td>
//                         <td className="p-2 text-center">{c.user_email}</td>
//                         <td className="p-2 text-center">{c.current_contribt}</td>
//                         <td className="p-2 text-center">{c.user_id}</td>
//                         <td className="p-2 text-center">{c.amount}</td>
//                         <td className="p-2 text-center">{c.currency}</td>
//                         <td className="p-2 text-center">
//                             {c.receipt_url ? (
//                             <a
//                                 href={c.receipt_url}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-500 underline"
//                             >
//                                 View
//                             </a>
//                             ) : (
//                             "No receipt"
//                             )}
//                         </td>
//                         <td className="p-2 text-center">{c.status}</td>
//                         <td className="p-2 text-center">
//                             {c.status === "pending" && (
//                             <>
//                                 <button
//                                 onClick={() => handleApprove(c.id)}
//                                 className="bg-green-500 text-white px-3 py-1 rounded mr-2"
//                                 >
//                                 Approve
//                                 </button>
//                                 <button
//                                 onClick={() => handleReject(c.id)}
//                                 className="bg-red-500 text-white px-3 py-1 rounded"
//                                 >
//                                 Reject
//                                 </button>
//                             </>
//                             )}
//                         </td>
//                         </tr>
//                     ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </>
    
//   );
// };

// export default AdminContributions;
import React, { useEffect, useState } from "react";
import Api from "../api/ApiIP";
import AdminNavbar from "./AdminNavbar";
import { useNavigate } from "react-router-dom";

const AdminContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [formValues, setFormValues] = useState({ amount: "", current_contribt: "" });

  const Token = sessionStorage.getItem("authToken");
  const navigate = useNavigate();

  const fetchContributions = async () => {
    const res = await fetch(`${Api}/api/v1/contributions`, {
      headers: {
        Authorization: `Bearer ${Token}`,
        Accept: "application/json",
      },
    });
    const data = await res.json();
    setContributions(data);
  };

  const openApproveModal = (c) => {
    setSelectedContribution(c);
    setFormValues({
      amount: c.amount,
      current_contribt: c.current_contribt,
      change_contribt: parseFloat(c.amount) + parseFloat(c.current_contribt)
    });
    setShowModal(true);
  };

//   const handleConfirmApprove = async () => {
//     if (!selectedContribution) return;

//     // Make API call to approve with updated values
//     await fetch(`${Api}/api/v1/contributions/${selectedContribution.id}/approve`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${Token}`,
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         amount: formValues.amount,
//         current_contribt: formValues.current_contribt,
//       }),
//     });

//     alert("Approved successfully!");
//     setShowModal(false);
//     fetchContributions();
//   };


    const handleConfirmApprove = async () => {
        if (!selectedContribution) return;

        await fetch(`${Api}/api/v1/contributions/${selectedContribution.id}/approve`, {
            method: "PUT",
            headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({
            change_contribt: formValues.change_contribt, // ✅ send only new value
            }),
        });

        alert("Approved successfully!");
        setShowModal(false);
        fetchContributions();
    };


  const handleReject = async (id) => {
    await fetch(`${Api}/api/v1/contributions/${id}/reject`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${Token}`,
        Accept: "application/json",
      },
    });
    alert("Rejected!");
    fetchContributions();
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-6 pt-32 md:pt-40 px-3 md:px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center w-full">
            Manage Contributions
          </h1>
        </div>

        <div className="bg-white shadow-md rounded-xl p-6 max-w-5xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 bg-[#b61825] text-white font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              ← Back
            </button>
          </div>

          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Current Contribution</th>
                <th className="p-2">User ID</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Deposit Type</th>
                <th className="p-2">Currency</th>
                <th className="p-2">Receipt</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contributions.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-2 text-center">{c.name}</td>
                  <td className="p-2 text-center">{c.user_email}</td>
                  <td className="p-2 text-center">{c.current_contribt}</td>
                  <td className="p-2 text-center">{c.user_id}</td>
                  <td className="p-2 text-center">{c.amount}</td>
                  <td className="p-2 text-center">{c.deposit_type}</td>
                  <td className="p-2 text-center">{c.currency}</td>
                  <td className="p-2 text-center">
                    {c.receipt_url ? (
                      <a
                        href={c.receipt_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View
                      </a>
                    ) : (
                      "No receipt"
                    )}
                  </td>
                  <td className="p-2 text-center">{c.status}</td>
                  <td className="p-2 text-center">
                    {c.status === "pending" && (
                      <>
                        <button
                          onClick={() => openApproveModal(c)}
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(c.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
        {showModal && (
            <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Approve Contribution</h2>

                {/* Current Contribution (Read Only) */}
                <div className="mb-3">
                    <label className="block font-semibold">Current Contribution</label>
                    <div className="w-full border rounded- p-2 mt-1 bg-gray-100 text-gray-700">
                    {formValues.current_contribt || "—"}
                    </div>
                </div>

                {/* Amount (Read Only) */}
                <div className="mb-3">
                    <label className="block font-semibold">New Contribution Amount</label>
                    <div className="w-full border rounded p-2 mt-1 bg-gray-100 text-gray-700">
                    {formValues.amount || "—"}
                    </div>
                </div>

                {/* New Contribution Input */}
                <div className="mb-3">
                    <label className="block font-semibold text-green-700">
                    Change Contribution (New Value)
                    </label>
                    <input
                    type="number"
                    placeholder="Enter new contribution"
                    value={formValues.change_contribt || ""}
                    onChange={(e) =>
                        setFormValues({ ...formValues, change_contribt: e.target.value })
                    }
                    className="w-full border rounded p-2 mt-1"
                    />
                </div>

                <div className="flex justify-end gap-2 mt-5">
                    <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                    >
                    Cancel
                    </button>
                    <button
                    onClick={handleConfirmApprove}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                    Confirm Approve
                    </button>
                </div>
                </div>
            </div>
        )}

    </>
  );
};

export default AdminContributions;
