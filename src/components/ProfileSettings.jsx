// import { useState, useEffect } from "react";
// import Api from "../api/ApiIP"; // your base URL
// import axios from "axios";

// export default function ProfileSettings({ onClose }) {
//   const [user, setUser] = useState({
//     name: "",
//     phone_number: "",
//     bank_name_or_crypto_type: "",
//     account_name: "",
//     account_number_or_wallet: "",
//     swift_or_protocol: "",
//     email: "",
//     crypto_wallet: "",
//   });

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setUser((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSave = () => {
// //     console.log("Saved:", user);
// //     onClose(); // close after save if you want
// //   };

//   const [loading, setLoading] = useState(true);

// //   const token = localStorage.getItem("authToken"); // auth token
//   const Token = sessionStorage.getItem("authToken");

//   useEffect(() => {
//     axios.get(`${Api}/api/v1/profile`, {
//       headers: { Authorization: `Bearer ${Token}` }
//     })
//     .then(res => {
//       setUser(res.data);
//       setLoading(false);
//     })
//     .catch(err => console.error(err));
//   }, []);

//   const handleChange = (e) => {
//     setUser({ ...user, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     axios.patch(`${Api}/api/v1/profile`, user, {
//       headers: { Authorization: `Bearer ${Token}` }
//     })

//     .then(res => alert("Your profile has been updated successfully."))
//     .catch(err => alert("Error updating profile"));
//     onClose();
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
//       {/* Modal content */}
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md relative">
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
//         >
//           ✕
//         </button>

//         <h1 className="text-2xl font-bold mb-4">Profile</h1>

//         <div className="mb-4">
//           <label>Full Name</label>
//           <input
//             type="text"
//             name="full_name"
//             value={user.name}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div className="mb-4">
//           <label>Contact Number</label>
//           <input
//             type="text"
//             name="contact_number"
//             value={user.phone_number}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div className="mb-4 space-y-2">
//           <label>Bank Name</label>
//           <input
//             type="text"
//             name="bank_name"
//             value={user.bank_name_or_crypto_type}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//           <label>Account Name</label>
//           <input
//             type="text"
//             name="account_name"
//             value={user.account_name}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//           <label>Account Number</label>
//           <input
//             type="text"
//             name="account_number"
//             value={user.account_number_or_wallet}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//           <label>SWIFT Code</label>
//           <input
//             type="text"
//             name="swift_code"
//             value={user.swift_or_protocol}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         <div className="mb-4">
//           <label>Email</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             className="border p-2 w-full"
//           />
//         </div>

//         {/* <div className="mb-4">
//           <label>Crypto Wallet</label>
//           <input
//             type="text"
//             name="crypto_wallet"
//             value={user.crypto_wallet}
//             readOnly
//             className="border p-2 w-full bg-gray-100"
//           />
//         </div> */}

//         <button
//           onClick={handleSave}
//           className="bg-blue-600 text-white p-2 rounded w-full"
//         >
//           Save Changes
//         </button>
//       </div>
//     </div>
//   );
// }
// import { useState, useEffect } from "react";
// import Api from "../api/ApiIP";

// export default function ProfileSettings() {
//   const Token = sessionStorage.getItem("authToken");

//   const [profile, setProfile] = useState({
//     name: "",
//     phone_number: "",
//     bank_name_or_crypto_type: "",
//     account_name: "",
//     account_number_or_wallet: "",
//     swift_or_protocol: "",
//     email: "",
//     password: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // Fetch profile details
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await fetch(`${Api}/api/v1/profile`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${Token}`,
//           },
//         });
//         if (!response.ok) throw new Error("Failed to fetch profile");
//         const data = await response.json();
//         console.log("Fetched profile data:", data);
//         setProfile(data);
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };

//     fetchProfile();
//   }, [Token]);

//   // Handle input change
// //   const handleChange = (e) => {
// //     setProfile({
// //       ...profile,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setProfile((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };


//   // Save profile (PATCH)
//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${Api}/api/v1/profile`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${Token}`,
//         },
//         body: JSON.stringify(profile),
//       });
//       if (!response.ok) throw new Error("Failed to save profile");
//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("Error saving profile:", err);
//       alert("Failed to save profile.");
//     } finally {
//       setLoading(false);
//     }
//   };


  
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
//         <div className="max-w-4xl w-1/2 mx-auto bg-white shadow-md rounded-xl p-6 mt-8">
//             <h2 className="text-lg font-bold border-b pb-2 mb-4">Profile Settings</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {/* Personal Info */}
//                 <div>
//                     <label className="block font-semibold">Full Name</label>
//                     <input
//                         type="text"
//                         name="full_name"
//                         value={profile.name}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded-lg"
//                     />
//                 </div>

//                 {/* Contact Info */}
//                 <div>
//                     <label className="block font-semibold">Contact Number</label>
//                     <input
//                         type="text"
//                         name="contact_number"
//                         value={profile.phone_number}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded-lg"
//                         placeholder="+91..."
//                     />
//                 </div>

//                 {/* Bank Details */}
//                 <div>
//                     <label className="block font-semibold">Bank Name</label>
//                     <input
//                         type="text"
//                         name="bank_name"
//                         value={profile.bank_name_or_crypto_type}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded-lg"
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-semibold">Account Name</label>
//                     <input
//                         type="text"
//                         name="account_name"
//                         value={profile.account_name}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded-lg"
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-semibold">Account Number</label>
//                     <input
//                         type="text"
//                         name="account_number"
//                         value={profile.account_number_or_wallet}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded-lg"
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-semibold">SWIFT Code</label>
//                     <input
//                         type="text"
//                         name="swift_code"
//                         value={profile.swift_or_protocol}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded-lg"
//                     />
//                 </div>

//                 {/* Login Credentials */}
//                 <div>
//                     <label className="block font-semibold">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={profile.email}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded-lg"
//                         disabled={true}
//                     />
//                 </div>
//                 <div>
//                     <label className="block font-semibold">Password</label>
//                     <input
//                         type="password"
//                         name="password"
//                         value={profile.password}
//                         onChange={handleChange}
//                         className="w-full border p-2 rounded-lg"
//                     />
//                 </div>
//             </div>

//             <div className="flex justify-end gap-3 mt-6">
//                 <button
//                 onClick={() => window.location.reload()}
//                 className="bg-gray-400 text-white px-4 py-2 rounded-lg"
//                 >
//                 Cancel
//                 </button>
//                 <button
//                 onClick={handleSave}
//                 disabled={loading}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//                 >
//                 {loading ? "Saving..." : "Save Changes"}
//                 </button>
//             </div>
//         </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import Api from "../api/ApiIP";

export default function ProfileSettings() {
  const Token = sessionStorage.getItem("authToken");

  const [profile, setProfile] = useState({
    name: "",
    phone_number: "",
    bank_name_or_crypto_type: "",
    account_name: "",
    account_number_or_wallet: "",
    swift_or_protocol: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Fetch profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${Api}/api/v1/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        console.log("Fetched profile data:", data);
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [Token]);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ Save profile (PATCH)
  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${Api}/api/v1/profile`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token}`,
        },
        body: JSON.stringify(profile),
      });
      if (!response.ok) throw new Error("Failed to save profile");
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 bg-opacity-50 z-50">
      <div className="max-w-4xl w-1/2 mx-auto bg-white shadow-md rounded-xl p-6 mt-8">
        <h2 className="text-lg font-bold border-b pb-2 mb-4">Profile Settings</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Personal Info */}
          <div>
            <label className="block font-semibold">Full Name</label>
            <input
              type="text"
              name="name" // ✅ correct key
              value={profile.name}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Contact Info */}
          <div>
            <label className="block font-semibold">Contact Number</label>
            <input
              type="text"
              name="phone_number" // ✅ correct key
              value={profile.phone_number}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              placeholder="+91..."
            />
          </div>

          {/* Bank Details */}
          <div>
            <label className="block font-semibold">Bank Name</label>
            <input
              type="text"
              name="bank_name_or_crypto_type" // ✅ correct key
              value={profile.bank_name_or_crypto_type}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Account Name</label>
            <input
              type="text"
              name="account_name"
              value={profile.account_name}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">Account Number</label>
            <input
              type="text"
              name="account_number_or_wallet" // ✅ correct key
              value={profile.account_number_or_wallet}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>
          <div>
            <label className="block font-semibold">SWIFT Code</label>
            <input
              type="text"
              name="swift_or_protocol" // ✅ correct key
              value={profile.swift_or_protocol}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div>

          {/* Login Credentials */}
          <div>
            <label className="block font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              className="w-full border p-2 rounded-lg bg-gray-100"
              disabled
            />
          </div>
          {/* <div>
            <label className="block font-semibold">Change passowrd</label>
            <input
              type="password"
              name="password"
              value={profile.password}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
            />
          </div> */}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => window.location.reload()}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
