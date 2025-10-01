import { useState } from "react";
import axios from "axios";

function PaymentForm() {
  const [formData, setFormData] = useState({
    name: "",
    bank_name: "",
    account_name: "",
    account_number: "",
    swift_code: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check if any field is empty
    for (const key in formData) {
      if (!formData[key].trim()) {
        alert(`Please fill in the ${key.replace("_", " ")} field.`);
        return;
      }
    }

    try {
      await axios.post("http://localhost:3000/api/v1/payment_details", {
        payment_detail: formData
      });
      alert("Payment details saved!");
      setFormData({
        name: "",
        bank_name: "",
        account_name: "",
        account_number: "",
        swift_code: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error saving payment details");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#b61825]">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Update Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"   // ✅ fixed
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full"
              required  // ✅ extra browser validation
            />
          </div>
          <div>
            <label>Bank Name / Cryptocurrency</label>
            <input
              type="text"
              name="bank_name"
              value={formData.bank_name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Account Name</label>
            <input
              type="text"
              name="account_name"
              value={formData.account_name}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>Account Number / Wallet Address</label>
            <input
              type="text"
              name="account_number"
              value={formData.account_number}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <div>
            <label>SWIFT Code / Blockchain Protocol</label>
            <input
              type="text"
              name="swift_code"
              value={formData.swift_code}
              onChange={handleChange}
              className="border p-2 w-full"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default PaymentForm;
