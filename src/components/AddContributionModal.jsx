import React, { useState } from "react";
// import { createContribution } from "../api/contributions";
import UploadReceipt from "./UploadReceipt";
import Api from "../api/ApiIP";
import ust from "../assets/ust.jpg"

const AddContributionModal = ({ onClose }) => {
  const [depositType, setDepositType] = useState("USDT");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const Token = sessionStorage.getItem("authToken");

  const createContribution = async (data) => {
    try {
      const response = await fetch(`${Api}/api/v1/contributions`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: data, // FormData — do NOT add "Content-Type" manually here!
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors || "Failed to create contribution");
      }

      return await response.json();
    } catch (error) {
      console.error("❌ createContribution error:", error);
      throw error;
    }
  };

  // ✅ 2. Fetch all contributions
  const fetchContributions = async () => {
    try {
      const response = await fetch(`${Api}/api/v1/contributions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${Token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors || "Failed to fetch contributions");
      }

      return await response.json();
    } catch (error) {
      console.error("❌ fetchContributions error:", error);
      throw error;
    }
  };



  const handleSubmit = async () => {
    if (!amount || !receipt) {
      alert("Please enter amount and upload receipt");
      return;
    }

    const formData = new FormData();
    formData.append("deposit_type", depositType);
    formData.append("amount", amount);
    formData.append("currency", depositType === "USDT" ? "USDT" : "USD");
    formData.append("receipt", receipt);

    setLoading(true);
    try {
      await createContribution(formData);
      alert("Contribution submitted successfully!");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Error submitting contribution");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Add Contribution</h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-md border ${depositType === "USDT" ? "bg-green-500 text-white" : ""}`}
            onClick={() => setDepositType("USDT")}
          >
            USDT Deposit
          </button>
          <button
            className={`px-4 py-2 rounded-md border ${depositType === "FIAT" ? "bg-blue-500 text-white" : ""}`}
            onClick={() => setDepositType("FIAT")}
          >
            Fiat Deposit
          </button>
        </div>

        {depositType === "USDT" ? (
          <div className="text-sm">
            <img
              src={ust}
              alt="USDT QR Code"
              className="mx-auto w-40 h-40 mb-3"
            />
            <p><b>Network:</b> Tron (TRC20)</p>
            <p><b>Address:</b> TMUda5mES2fca2DJPYExcNecXKPHmp5yQZ</p>
            <p><b>Minimum Deposit:</b> 0.01 USDT</p>
          </div>
        ) : (
          <div className="text-sm space-y-1">
            <p><b>Bank Name:</b> BANK OF THE PHILIPPINE ISLANDS (BPI)</p>
            <p><b>Account Name:</b> Z MANUFACTURING WING CORP.</p>
            <p><b>USD Account #:</b> 5054032546</p>
            <p><b>Branch Code:</b> br00505</p>
            <p><b>SWIFT Code:</b> BOPIPHMM</p>
          </div>
        )}

        <div className="mt-4">
          <label className="block text-gray-700 mb-1">Amount:</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
        </div>

        <UploadReceipt onFileSelect={setReceipt} />

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border rounded-md">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContributionModal;
