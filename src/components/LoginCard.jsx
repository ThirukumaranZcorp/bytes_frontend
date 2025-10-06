// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// // import logo from "../../public/logo.png";
// import logo from "../assets/logo3.png"

// export default function LoginCard() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("http://localhost:3000/users/sign_in", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({
//           user: { email, password },
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         alert("Login failed: " + (errorData.error || "Invalid credentials"));
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();
//       console.log("Login success:", data);

//       // 🔑 If you're using devise-jwt, token will be in headers:
//       const token = response.headers.get("Authorization");
//       if (token) {
//         localStorage.setItem("authToken", token);
//       }

//       alert("Login successful!");
//       navigate("/dashboard");
//     } catch (error) {
//       console.error("Network error:", error);
//       alert("Something went wrong. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white">
//       <div className="bg-[#b61825] shadow-lg rounded-xl p-8 w-full max-w-md">
//         {/* Centered Logo */}
//         <div className="flex justify-center mb-4">
//           <img
//             src={logo}
//             alt="logo"
//             className="w-30 h-30 object-contain drop-shadow-md"
//           />
//         </div>

//         <h2 className="text-3xl font-bold text-center mb-6 text-white">
//           Login
//         </h2>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter Email"
//             className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter Password"
//             className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           <p className="text-sm text-black text-center mt-4">
//             Don’t have an account?{" "}
//             <Link
//               to="/signup"
//               className="text-blue-600 hover:underline font-semibold"
//             >
//               Sign Up
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/logo3.png";
import Api from "../api/ApiIP"

export default function LoginCard() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${Api}/users/sign_in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user: { email, password },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert("Login failed: " + (errorData.error || "Invalid credentials"));
        setLoading(false);
        return;
      }

      const data = await response.json();
      console.log("Login success:", data);

      const token = data.token;
      sessionStorage.setItem("authToken", token); // ✅ store in sessionStorage

      // Map numeric role to string
      let roleName = "";
      switch (data.user.role) {
        case 1:
          roleName = "admin";
          break;
        case 0:
          roleName = "user";
          break;
        default:
          roleName = "user";
      }
      console.log("User role:", roleName);
      sessionStorage.setItem("role", roleName); // ✅ also store role in sessionStorage

      alert("Login successful!");

      // Navigate based on role
      if (roleName === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Network error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
      <div className="bg-[#b61825] shadow-lg rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logo}
            alt="logo"
            className="w-24 h-24 sm:w-28 sm:h-28 object-contain drop-shadow-md"
          />
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-white">
          Login
        </h2>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-full border border-gray-300 bg-white rounded-lg px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-xs sm:text-sm text-black text-center mt-4">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-200 hover:text-blue-100 underline font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
