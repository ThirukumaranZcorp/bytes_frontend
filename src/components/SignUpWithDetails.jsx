// import { useState } from "react";
// import axios from "axios";
// // import logo from "../assets/logo2.jpg";
// import logo from "../assets/logo3.png"
// export default function SignUpWithDetails() {
//   const [step, setStep] = useState(1); // 1 = account info, 2 = payment info
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     bank_name: "",
//     account_name: "",
//     account_number: "",
//     swift_code: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleNext = (e) => {
//     e.preventDefault();
//     // Validate step 1 fields
//     if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//       alert("Please fill all fields.");
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }
//     setStep(2);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Validate step 2 fields
//     const paymentFields = ["bank_name", "account_name", "account_number", "swift_code"];
//     for (const field of paymentFields) {
//       if (!formData[field].trim()) {
//         alert(`Please fill in ${field.replace("_", " ")}`);
//         return;
//       }
//     }

//     try {
//       const response = await axios.post("http://localhost:3000/users", {
//         user: {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password,
//           password_confirmation: formData.confirmPassword,
//           bank_name: formData.bank_name,
//           account_name: formData.account_name,
//           account_number: formData.account_number,
//           swift_code: formData.swift_code
//         }
//       });

//       alert("Account created successfully!");
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         confirmPassword: "",
//         bank_name: "",
//         account_name: "",
//         account_number: "",
//         swift_code: ""
//       });
//       setStep(1);
//       // Optionally redirect to login page
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Signup failed:", error.response?.data || error);
//       alert("Signup failed. Please check the details and try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="bg-[#b61825] shadow-lg rounded-xl p-8 w-full max-w-md">
//         {/* <div className="flex justify-center mb-4">
//           <img src={logo} alt="logo" className="w-20 h-20 object-contain drop-shadow-md" />
//         </div> */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={logo}
//             alt="logo"
//             className="w-30 h-30 object-contain drop-shadow-md"
//           />
//         </div>

//         <h2 className="text-2xl font-bold text-center mb-6 text-white">
//           {step === 1 ? "Create Account" : "Payment Details"}
//         </h2>

//         <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-4">
//           {step === 1 && (
//             <>
//               <div>
//                 <label className="block text-white font-semibold mb-1">Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-white font-semibold mb-1">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your email"
//                 />
//               </div>

//               <div>
//                 <label className="block text-white font-semibold mb-1">Password</label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Enter your password"
//                 />
//               </div>

//               <div>
//                 <label className="block text-white font-semibold mb-1">Confirm Password</label>
//                 <input
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Confirm password"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
//               >
//                 Next
//               </button>
//             </>
//           )}

//           {step === 2 && (
//             <>
//               <div>
//                 <label className="block text-white font-semibold mb-1">Bank Name / Cryptocurrency</label>
//                 <input
//                   type="text"
//                   name="bank_name"
//                   value={formData.bank_name}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Bank or crypto name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-white font-semibold mb-1">Account Name</label>
//                 <input
//                   type="text"
//                   name="account_name"
//                   value={formData.account_name}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Account name"
//                 />
//               </div>

//               <div>
//                 <label className="block text-white font-semibold mb-1">Account Number / Wallet Address</label>
//                 <input
//                   type="text"
//                   name="account_number"
//                   value={formData.account_number}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="Account number or wallet address"
//                 />
//               </div>

//               <div>
//                 <label className="block text-white font-semibold mb-1">SWIFT Code / Blockchain Protocol</label>
//                 <input
//                   type="text"
//                   name="swift_code"
//                   value={formData.swift_code}
//                   onChange={handleChange}
//                   required
//                   className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="SWIFT or blockchain code"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
//               >
//                 Submit
//               </button>
//             </>
//           )}
//         </form>

//         <p className="text-sm text-white text-center mt-4">
//           Already have an account?{" "}
//           <a href="/" className="text-blue-600 hover:underline font-semibold">
//             Login
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo3.png";

export default function SignUpWithDetails() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
    residential_address: "",
    contribution_amount: "",
    currency: "GBP",
    issuance_date: new Date().toISOString().split("T")[0],
    start_date: "",
    end_date: "",
    method: "Bank",
    bank_name_or_crypto_type: "",
    account_name: "",
    account_number_or_wallet: "",
    swift_or_protocol: "",
    terms_accepted: false,
    risk_disclosure_accepted: false,
    renewal_fee_accepted: false,
    typed_name: "",
    date_signed: new Date().toISOString().split("T")[0],
  });

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target;
  //   setFormData({
  //     ...formData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedData = {
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    };

    // Auto-set end_date if start_date changes
    if (name === "start_date" && value) {
      const startDate = new Date(value);
      const endDate = new Date(startDate);
      endDate.setFullYear(endDate.getFullYear() + 1); // +1 year
      updatedData.end_date = endDate.toISOString().split("T")[0];
    }

    setFormData(updatedData);
  };





  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:3000/users", {
  //       sign_up: formData,
  //     });
  //     alert("Signup successful, certificate will be generated!");
  //     setStep(1);

  //   } catch (error) {
  //     console.error("Signup failed:", error.response?.data || error);
  //     alert("Signup failed. Please try again.");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post("http://localhost:3000/users", {
  //       sign_up: formData,
  //     });
  //     console.log(response.data.user,"-----------response")
  //     const userId = response.data.user.id; // make sure your backend returns the new user's ID

  //     alert("Signup successful, certificate will be generated!");

  //     // Open PDF in new tab
  //     window.open(`http://localhost:3000/api/v1/certificate/${userId}.pdf`, "_blank");
  //     setStep(1);

  //   } catch (error) {
  //     console.error("Signup failed:", error.response?.data || error);
  //     alert("Signup failed. Please try again.");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/users", {
        sign_up: formData,
      });

      const userId = response.data.user.id;

      alert("Signup successful, certificate will be downloaded!");

      // Fetch PDF as blob
      const pdfResponse = await axios.get(
        `http://localhost:3000/api/v1/certificate/${userId}.pdf`,
        { responseType: "blob" }
      );

      // Create a blob link to download
      const url = window.URL.createObjectURL(new Blob([pdfResponse.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificate.pdf"); // custom filename
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.location.href = "/";

      setStep(1);
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error);
      alert("Signup failed. Please try again.");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-[#b61825] shadow-lg rounded-xl p-8 w-full max-w-lg">
        <div className="flex justify-center mb-4">
          <img src={logo} alt="logo" className="w-30 h-30 object-contain drop-shadow-md" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          {step === 1 && "Create Account"}
          {step === 2 && "Contribution Details"}
          {step === 3 && "Banking / Crypto Info"}
          {step === 4 && "Acknowledgements"}
          {step === 5 && "Signature"}
        </h2>

        <form onSubmit={step === 5 ? handleSubmit : handleNext} className="space-y-4">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Full Name
                </span>
              </label>
              <input type="text" name="fullName" placeholder="Full Name"
                value={formData.fullName} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2 bg-white" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Email
                </span>
              </label>




              <input type="email" name="email" placeholder="Email"
                value={formData.email} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                required />




              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Password
                </span>
              </label>

              <input type="password" name="password" placeholder="password"
                value={formData.password} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                required />

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Confirm Password
                </span>
              </label>

              <input type="password" name="password_confirmation" placeholder="confrim password"
                value={formData.password_confirmation} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                required />

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Phone
                </span>
              </label>


              <input type="text" name="phone_number" placeholder="Phone (optional)"
                value={formData.phone_number} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Address
                </span>
              </label>


              <input type="text" name="residential_address" placeholder="Residential Address (optional)"
                value={formData.residential_address} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Contribution Amount
                </span>
              </label>

              <input type="number" name="contribution_amount" placeholder="Contribution Amount"
                value={formData.contribution_amount} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                
                required />

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Select Currency
                </span>
              </label>


              <select name="currency" value={formData.currency} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                >
                <option>GBP</option>
                <option>USD</option>
                <option>EUR</option>
                <option>PHP</option>
                <option>USDT</option>
                <option>BTC</option>
                <option>ETH</option>
              </select>

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Issuance Date
                </span>
              </label>


              <input type="date" name="issuance_date" value={formData.issuance_date}
                onChange={handleChange} 
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium" style={{ fontFamily: "Times New Roman" }}>
                  Start Date of Profit Term
                </span>

              </label>

              <input type="date" name="start_date" value={formData.start_date}
                onChange={handleChange} 
                placeholder="start_date"
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                required />
              

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                 End Date of Profit Term
                </span>
              </label>

              <input type="date" name="end_date" value={formData.end_date}
                onChange={handleChange}
                placeholder="end_date" 
                // className="w-full border rounded-lg px-3 py-2"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Select Method
                </span>
              </label>

              <select name="method" value={formData.method} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                >
                <option value="Bank">Bank</option>
                <option value="Crypto">Crypto</option>
              </select>

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Enter Bank Name / Crypto Type
                </span>
              </label>


              <input type="text" name="bank_name_or_crypto_type" placeholder="Bank / Crypto Type"
                value={formData.bank_name_or_crypto_type} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                required />


              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Account Name
                </span>
              </label>


              <input type="text" name="account_name" placeholder="Account Name"
                value={formData.account_name} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />


              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Account Number
                </span>
              </label>



              <input type="text" name="account_number_or_wallet" placeholder="Account Number / Wallet"
                value={formData.account_number_or_wallet} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                required />

              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  SWIFT / Protocol
                </span>
              </label>


              <input type="text" name="swift_or_protocol" placeholder="SWIFT / Protocol"
                value={formData.swift_or_protocol} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"

                />
            </>
          )}

          {/* {step === 4 && (
            <>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="terms_accepted"
                  checked={formData.terms_accepted}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-white text-sm font-medium">
                  I accept the Terms and Conditions
                </span>
              </label>

              <label className="flex items-center space-x-3 mt-2">
                <input
                  type="checkbox"
                  name="risk_disclosure_accepted"
                  checked={formData.risk_disclosure_accepted}
                  onChange={handleChange}
                  className="h-5 w-5 text-green-500 rounded border-gray-300 focus:ring-2 focus:ring-green-400"
                />
                <span className="text-white text-sm font-medium">
                  I acknowledge the Risk Disclosure
                </span>
              </label>

              <label className="flex items-center space-x-3 mt-2">
                <input
                  type="checkbox"
                  name="renewal_fee_accepted"
                  checked={formData.renewal_fee_accepted}
                  onChange={handleChange}
                  className="h-5 w-5 text-purple-500 rounded border-gray-300 focus:ring-2 focus:ring-purple-400"
                />
                <span className="text-white text-sm font-medium">
                  I agree to the 5% renewal fee
                </span>
              </label>
            </>
          )} */}

          {step === 4 && (
            <>
              <div className="bg-white p-4 rounded-lg h-48 overflow-y-scroll mb-4 text-black">
                <h3 className="font-semibold mb-2" style={{ fontFamily: "Times New Roman" }}>Profit Sharing and Payment Schedule</h3>
                <p>
                  The Participant shall be entitled to receive a share of the trading profits generated during the Profit Term as follows:
                </p>
                <ul className="list-disc ml-6">
                  <li><strong>Profit Sharing:</strong> The Investment Chart reflects the Company’s assessment of profit share ranges and corresponding risk levels at a given point in time. These ranges and risk levels are subject to revision without prior notice in order to align with market conditions, strategic adjustments, and portfolio management considerations.</li>
                  <li><strong>Payment Schedule:</strong> Distributions shall be processed within twenty-four (24) hours or the next business day following the receipt of funds. Thereafter, subsequent distributions shall follow a recurring one-month cycle, with profits made available to the Participant on a monthly basis for the duration of the Profit Term.</li>
                </ul>

                <h3 className="font-semibold mt-4 mb-2" style={{ fontFamily: "Times New Roman" }}>Risk Disclosure</h3>
                <p>The Participant acknowledges and accepts that all trading, exchange, and investment activities involve inherent risks, including but not limited to market volatility, liquidity fluctuations, and regulatory changes. While the Company endeavors to implement prudent strategies and operational safeguards to enhance accuracy and consistency,<strong> returns beyond the stated minimum guaranteed share cannot be assured.</strong></p>
                <p>By entering into this arrangement, the Participant confirms that they:</p>
                 <ol className="list-disc ml-6">
                  <li>Understand the nature of the risks involved in trading and exchange activities;</li>
                  <li>Have reviewed the Investment Chart to gain a clear understanding of the allowable ranges and associated risk levels;</li>
                  <li>Accept full responsibility for their decision to participate as an informed and knowledgeable investor.</li>
                </ol>
                <p>The Company shall not be held liable for losses or reduced returns arising from market conditions or factors beyond its reasonable control.</p>
                
                
                
                <h3 className="font-semibold mt-4 mb-2" style={{ fontFamily: "Times New Roman" }}>Return of Contribution & Renewal</h3>
                <p>Within thirty (30) days after the conclusion of the Profit Term (a period of one year or twelve [12] months of equivalent participation), the Participant shall have the option to:</p>
                <ol className="list-disc ml-6">
                  <li><strong>Withdraw</strong> the original Contribution in full; or</li>
                  <li><strong>Reinvest</strong> the Contribution into a new profit-sharing term under mutually agreed conditions, subject to a <strong>renewal fee of five percent (5%) </strong>of the Contribution, which shall be deducted at the time of renewal.</li>
                </ol>

                <p>Failure of the Participant to provide written instruction within the thirty (30) day period may, at the Company’s discretion, result in automatic renewal of the Contribution under the prevailing terms and conditions, inclusive of the applicable renewal fee.</p>
              </div>

              {/* Checkboxes */}
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="terms_accepted"
                  checked={formData.terms_accepted}
                  onChange={handleChange}
                  className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-white text-md font-medium">
                  I accept the Terms and Conditions
                </span>
              </label>

              <label className="flex items-center space-x-3 mt-2">
                <input
                  type="checkbox"
                  name="risk_disclosure_accepted"
                  checked={formData.risk_disclosure_accepted}
                  onChange={handleChange}
                  className="h-5 w-5 text-green-500 rounded border-gray-300 focus:ring-2 focus:ring-green-400"
                />
                <span className="text-white text-md font-medium">
                  I acknowledge the Risk Disclosure
                </span>
              </label>

              <label className="flex items-center space-x-3 mt-2">
                <input
                  type="checkbox"
                  name="renewal_fee_accepted"
                  checked={formData.renewal_fee_accepted}
                  onChange={handleChange}
                  className="h-5 w-5 text-purple-500 rounded border-gray-300 focus:ring-2 focus:ring-purple-400"
                />
                <span className="text-white text-md font-medium">
                  I agree to the 5% renewal fee
                </span>
              </label>
            </>
          )}



          {/* STEP 5 */}
          {step === 5 && (
            <>
              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Full name
                </span>
              </label>

              <input type="text" name="typed_name" placeholder="Type your full name"
                value={formData.typed_name} onChange={handleChange}
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"                
                required />
              <label className="flex items-center space-x-3 mt-2">

                <span className="text-white text-md font-medium">
                  Date of Signing
                </span>
              </label>
              <input type="date" name="date_signed" value={formData.date_signed}
                onChange={handleChange} 
                // className="w-full border rounded-lg px-3 py-2" 
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required />
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            {step > 1 && (
              <button onClick={handleBack} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                Back
              </button>
            )}
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              {step === 5 ? "Submit" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
