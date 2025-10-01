import { useState } from "react";
// import logo from "../../public/logo.png";
// import logo from "../assets/logo3.png"
import logo from "../assets/logo3.png"

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            password_confirmation: formData.confirmPassword,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Signup failed:", errorData);
        alert("Signup failed: " + (errorData.error || "Unknown error"));
        return;
      }

      const data = await response.json();
      console.log("Signup success:", data);

      // alert("Account created successfully!");
      // Optionally redirect to login page
      window.location.href = "/payment_details";
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong, please try again later.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-[#b61825] shadow-lg rounded-xl p-8 w-full max-w-md">

        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="w-30 h-30 object-contain drop-shadow-md"
          />
        </div>


        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-white   font-semibold mb-1">
              Name
            </label>
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

          {/* Email */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-white text-whiteborder border-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-white border border-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-white font-semibold mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full bg-white border border-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm password"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Sign Up
          </button>

          {/* Redirect to Login */}
          <p className="text-sm text-white text-center mt-4">
            Already have an account?{" "}
            <a href="/" className="text-blue-600 hover:underline font-semibold">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
