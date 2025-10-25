import React from "react";

const UploadReceipt = ({ onFileSelect }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-gray-700 mb-2">Upload Receipt:</label>
      <input
        type="file"
        accept="image/*,application/pdf"
        onChange={handleFileChange}
        className="block w-full border p-2 rounded-md"
      />
    </div>
  );
};

export default UploadReceipt;
