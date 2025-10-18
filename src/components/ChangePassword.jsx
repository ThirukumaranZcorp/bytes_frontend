import { useState } from "react";
import Api from "../api/ApiIP"; // your API setup file

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const Token = sessionStorage.getItem("authToken");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//         setMessage("New passwords do not match");
//         return;
//     }

//     try {
//         const response = await fetch(`${Api}/users/change_password`, {
//         method: "PATCH",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//             Authorization: `Bearer ${Token}`,
//         },
//         body: JSON.stringify({
//             current_password: currentPassword,
//             new_password: newPassword,
//         }),
//         });

//         const data = await response.json();

//         if (!response.ok) {
//         // If server returned an error
//         throw new Error(data.error || "Something went wrong");
//         }

//         // Success
//         setMessage(data.message);
//     } catch (err) {
//         setMessage(err.message || "Something went wrong");
//     }
//     };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match");
            return;
        }

        try {
            const response = await fetch(`${Api}/users/change_password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${Token}`,
            },
            body: JSON.stringify({
                current_password: currentPassword,
                new_password: newPassword,
            }),
            });

            const data = await response.json();
            console.log("Response:", data);

            if (!response.ok) {
            setMessage(data.error || "Failed to change password");
            return; // ⬅️ prevent showing success when it failed
            }

            setMessage(data.message || "Password changed successfully");
        } catch (err) {
            setMessage(err.message || "Something went wrong");
        }
    };


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#b61825] ">
        <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md ">
            <h2 className="text-2xl font-bold mb-4 text-center ">Change Password</h2>

            <form onSubmit={handleSubmit}>
            <label className="block mb-2 font-semibold">Current Password</label>
            <input
                type="password"
                className="border w-full p-2 mb-4 rounded"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
            />

            <label className="block mb-2 font-semibold">New Password</label>
            <input
                type="password"
                className="border w-full p-2 mb-4 rounded"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />

            <label className="block mb-2 font-semibold">Confirm New Password</label>
            <input
                type="password"
                className="border w-full p-2 mb-4 rounded"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full"
            >
                Change Password
            </button>
            <div className="my-2"></div>
            <button
                onClick={() => (window.location.href = "/")}
                className="bg-gray-400 hover:bg-gray-700 text-white py-2 px-4 rounded w-full"
            >
                Back 
            </button>
            </form>

            {message && <p className="text-green-500 text-sm mt-4">{message}</p>}
        </div>
    </div>

  );
}
