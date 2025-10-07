import React, { useState, useEffect } from "react";
import axios from "axios";
import Api from "../api/ApiIP";

export default function CreateNotification({user,onCencel}) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(user); // Leave blank for all users
  const [users, setUsers] = useState([]); // Optional: dropdown for users
  const [loading, setLoading] = useState(false);
  const Token = sessionStorage.getItem("authToken");

  // Fetch users for dropdown
  useEffect(() => {
    axios
      .get(`${Api}/api/v1/show_details`, {
        headers: { Authorization: `Bearer ${Token}` },
      })
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) return alert("Title and body are required");

    setLoading(true);
    try {
      await axios.post(
        `${Api}/api/v1/notifications`,
        {
          title,
          body,
          user_id: userId || null, // null = all users
        },
        {
          headers: { Authorization: `Bearer ${Token}` },
        }
      );
      alert("Notification sent!");
      setTitle("");
      setBody("");
      setUserId("");
    } catch (err) {
      console.error(err);
      alert("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
    //   <h2 className="text-2xl font-bold mb-4">Create Notification</h2>
    //   <form onSubmit={handleSubmit} className="space-y-4">
    //     <div>
    //       <label className="block font-semibold mb-1">Title</label>
    //       <input
    //         type="text"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         className="w-full border p-2 rounded"
    //         placeholder="Notification title"
    //       />
    //     </div>

    //     <div>
    //       <label className="block font-semibold mb-1">Body</label>
    //       <textarea
    //         value={body}
    //         onChange={(e) => setBody(e.target.value)}
    //         className="w-full border p-2 rounded"
    //         placeholder="Notification body"
    //       />
    //     </div>

    //     <div>
    //       <label className="block font-semibold mb-1">User (optional)</label>
    //       <select
    //         value={userId}
    //         onChange={(e) => setUserId(e.target.value)}
    //         className="w-full border p-2 rounded"
    //       >
    //         <option value="">All Users</option>
    //         {users.map((user) => (
    //           <option key={user.id} value={user.id}>
    //             {user.email}
    //           </option>
    //         ))}
    //       </select>
    //     </div>

    //     <button
    //       type="submit"
    //       className={`w-full p-2 rounded text-white font-semibold ${
    //         loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
    //       }`}
    //       disabled={loading}
    //     >
    //       {loading ? "Sending..." : "Send Notification"}
    //     </button>
    //   </form>
    // </div>

    
    <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Create Notification
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notification Title
            </label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Enter notification title"
                required
            />
            </div>

            {/* Body */}
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Notification Body
            </label>
            <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder="Write your message..."
                required
            />
            </div>

            {/* User Select */}
            <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
                Send To
            </label>
            <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
                <option value="">All Users</option>
                {users.map((user) => (
                <option key={user.id} value={user.id}>
                    {user.email}
                </option>
                ))}
            </select>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
            <button
                type="submit"
                disabled={loading}
                className={`flex-1 py-3 rounded-lg font-semibold text-white shadow-md transition-all duration-300 transform ${
                loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02]"
                }`}
            >
                {loading ? (
                <span className="flex items-center justify-center space-x-2">
                    <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                    </svg>
                    <span>Sending...</span>
                </span>
                ) : (
                "Send Notification"
                )}
            </button>

            <button
                type="button"
                onClick={onCencel} // ✅ closes the popup or navigates back
                // onClick={() => window.history.back()}
                className="flex-1 py-3 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 shadow-md transition-all duration-300 hover:scale-[1.02]"
            >
                Cancel
            </button>
            </div>
        </form>
    </div>



  );
}
