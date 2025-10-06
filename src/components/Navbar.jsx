// import React, { useState } from "react";
// import logo from "../assets/logo2.jpg"
// import { useNavigate } from "react-router-dom";
// import '@fortawesome/fontawesome-free/css/all.min.css';


// export default function Navbar() {
//   const navigate = useNavigate();
//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 ">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-36 items-center">
          
//           {/* Logo */}
//           <div className="flex-shrink-0 ">
//             <a href="/" className="flex items-start">
//               <img
//                 src={logo} // <-- Replace with your logo path
//                 alt="Logo"
//                 className="h-30 w-30"
//               />
//             </a>
//           </div>


//           <div className="flex items-center space-x-4">
            
//             {/* Notification Bell */}
//             {/* <NotificationBell /> */}

//             {/* Profile Icon */}
//             <div className="relative">
//               <button
//                 onClick={() => setProfileMenuOpen(!profileMenuOpen)}
//                 className="focus:outline-none"
//               >
//                 <i className="fas fa-user-circle text-2xl text-gray-700 hover:text-blue-600"></i>
//               </button>

//               {/* Dropdown Menu */}
//               {profileMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
//                   <button
//                     onClick={() => {
//                       navigate("/profile-settings");
//                       setProfileMenuOpen(false);
//                     }}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Profile Settings
//                   </button>
//                   <button
//                     onClick={() => {
//                       localStorage.removeItem("authToken");
//                       navigate("/login");
//                     }}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button
//               type="button"
//               className="text-gray-700 hover:text-blue-600 focus:outline-none"
//             >
//               {/* Hamburger Icon */}
//               <svg
//                 className="h-6 w-6"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }
import React, { useState } from "react";
import logo from "../assets/logo2.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProfileSettings from "./ProfileSettings"

export default function Navbar() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const token = sessionStorage.getItem("authToken");
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-36 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-start">
              <img
                src={logo}
                alt="Logo"
                className="h-30 w-30"
              />
            </a>
          </div>

          <div className="flex items-center space-x-4">
            
            {/* Profile Icon */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="focus:outline-none"
              >
                <div className="flex flex-col items-center">
                {/* <i className="fas fa-user-circle text-2xl text-gray-700 hover:text-blue-600 h-20 w-20"></i> */}
                <i className="fas fa-user-circle text-4xl text-gray-700 hover:text-blue-600"></i>
                <p>user</p>
                </div>

              </button>

              {/* Dropdown Menu */}
              {profileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      setProfilePopupOpen(true); // Open modal instead of navigating
                      setProfileMenuOpen(false); // Close dropdown
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      sessionStorage.removeItem("authToken");
                      // localStorage.removeItem("authToken");
                      window.location.href = "/"; // or navigate if using react-router
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Profile Settings Popup */}
    
      {profilePopupOpen && (
        <ProfileSettings onClose={() => setProfilePopupOpen(false)} />
      )}

    </nav>
  );
}
