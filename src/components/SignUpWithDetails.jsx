import { useState } from "react";
import axios from "axios";
// import logo from "../assets/logo2.jpg";
import logo from "../assets/logo3.png"
export default function SignUpWithDetails() {
  const [step, setStep] = useState(1); // 1 = account info, 2 = payment info
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    bank_name: "",
    account_name: "",
    account_number: "",
    swift_code: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    // Validate step 1 fields
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate step 2 fields
    const paymentFields = ["bank_name", "account_name", "account_number", "swift_code"];
    for (const field of paymentFields) {
      if (!formData[field].trim()) {
        alert(`Please fill in ${field.replace("_", " ")}`);
        return;
      }
    }

    try {
      const response = await axios.post("http://localhost:3000/users", {
        user: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          password_confirmation: formData.confirmPassword,
          bank_name: formData.bank_name,
          account_name: formData.account_name,
          account_number: formData.account_number,
          swift_code: formData.swift_code
        }
      });

      alert("Account created successfully!");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        bank_name: "",
        account_name: "",
        account_number: "",
        swift_code: ""
      });
      setStep(1);
      // Optionally redirect to login page
      window.location.href = "/";
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error);
      alert("Signup failed. Please check the details and try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-[#b61825] shadow-lg rounded-xl p-8 w-full max-w-md">
        {/* <div className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="w-20 h-20 object-contain drop-shadow-md" />
        </div> */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="w-30 h-30 object-contain drop-shadow-md"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          {step === 1 ? "Create Account" : "Payment Details"}
        </h2>

        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-white font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Next
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-white font-semibold mb-1">Bank Name / Cryptocurrency</label>
                <input
                  type="text"
                  name="bank_name"
                  value={formData.bank_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Bank or crypto name"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">Account Name</label>
                <input
                  type="text"
                  name="account_name"
                  value={formData.account_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Account name"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">Account Number / Wallet Address</label>
                <input
                  type="text"
                  name="account_number"
                  value={formData.account_number}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Account number or wallet address"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-1">SWIFT Code / Blockchain Protocol</label>
                <input
                  type="text"
                  name="swift_code"
                  value={formData.swift_code}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SWIFT or blockchain code"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Submit
              </button>
            </>
          )}
        </form>

        <p className="text-sm text-white text-center mt-4">
          Already have an account?{" "}
          <a href="/" className="text-blue-600 hover:underline font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
