import React, { useState } from "react";
// import { createNotification } from "../api/notifications";

export default function AdminNotificationForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userId, setUserId] = useState(""); // optional, leave blank for all

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createNotification({ title, body, user_id: userId || null });
    setTitle("");
    setBody("");
    setUserId("");
    alert("Notification sent!");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">Send Notification</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <textarea
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <input
        type="text"
        placeholder="User ID (optional)"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
        Send
      </button>
    </form>
  );
}
