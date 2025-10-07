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
// // }
// import React, { useState } from "react";
// import logo from "../assets/logo2.jpg";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import ProfileSettings from "./ProfileSettings"

// export default function Navbar() {
//   const [profileMenuOpen, setProfileMenuOpen] = useState(false);
//   const [profilePopupOpen, setProfilePopupOpen] = useState(false);
//   const token = sessionStorage.getItem("authToken");
//   return (
//     <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-36 items-center">
          
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a href="/" className="flex items-start">
//               <img
//                 src={logo}
//                 alt="Logo"
//                 className="h-30 w-30"
//               />
//             </a>
//           </div>

//           <div className="flex items-center space-x-4">
            
//             {/* Profile Icon */}
//             <div className="relative">
//               <button
//                 onClick={() => setProfileMenuOpen(!profileMenuOpen)}
//                 className="focus:outline-none"
//               >
//                 <div className="flex flex-col items-center">
//                 {/* <i className="fas fa-user-circle text-2xl text-gray-700 hover:text-blue-600 h-20 w-20"></i> */}
//                 <i className="fas fa-user-circle text-4xl text-gray-700 hover:text-blue-600"></i>
//                 <p>user</p>
//                 </div>

//               </button>

//               {/* Dropdown Menu */}
//               {profileMenuOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
//                   <button
//                     onClick={() => {
//                       setProfilePopupOpen(true); // Open modal instead of navigating
//                       setProfileMenuOpen(false); // Close dropdown
//                     }}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Profile Settings
//                   </button>
//                   <button
//                     onClick={() => {
//                       sessionStorage.removeItem("authToken");
//                       // localStorage.removeItem("authToken");
//                       window.location.href = "/"; // or navigate if using react-router
//                     }}
//                     className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Profile Settings Popup */}
    
//       {profilePopupOpen && (
//         <ProfileSettings onClose={() => setProfilePopupOpen(false)} />
//       )}

//     </nav>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo2.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import ProfileSettings from "./ProfileSettings";
import Api from "../api/ApiIP";
export default function Navbar() {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false); 
  const token = sessionStorage.getItem("authToken");

  const profileRef = useRef();
  const notifRef = useRef();
  const [notifications, setNotifications] = useState([]);
  // const notifications = [
  //   { id: 1, message: "Your payment has been received", status: "unread" },
  //   { id: 2, message: "New message from admin", status: "unread" },
  //   { id: 3, message: "Your profile was updated", status: "read" },
  // ];


  const fetchNotifications = async () => {
    const response = await fetch(`${Api}/api/v1/notifications`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }

    const data = await response.json();
    return data;
  };

  const markAsRead = async (id) => {
    const response = await fetch(`${Api}/api/v1/notifications/${id}/read`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to mark notification as read");
    }

    return await response.json();
  };


  useEffect(() => {
    // Fetch notifications on mount
    fetchNotifications()
      .then(setNotifications)
      .catch((err) => console.error(err));
  }, []);

  const handleRead = async (id) => {
    try {
      await markAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error(err);
    }
  };



  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-36 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-start">
              <img src={logo} alt="Logo" className="h-30 w-30" />
            </a>
          </div>

          <div className="flex items-center space-x-4">
            
           

            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="focus:outline-none relative"
              >
                <i className="fas fa-bell text-2xl text-gray-700 hover:text-blue-600"></i>
                {notifications.some(n => n.status === "unread") && (
                  <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
                )}
              </button>

              {notifOpen && (
              <div
                className={`absolute right-0 mt-3 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto transform transition-all duration-300 ease-out origin-top`}
              >
                {/* Header */}
                <div className="flex justify-between items-center p-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800 text-lg">Notifications</h4>
                  <button
                    onClick={() => setNotifications([])}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>

                {/* Notification List */}
                  {notifications.length > 0 ? (
                    <ul className="divide-y divide-gray-100">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          className={`flex flex-col gap-1 p-4 hover:bg-gray-50 transition-all ${
                            n.read ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          {/* Title */}
                          <div className="flex items-center justify-between">
                            <span
                              className={`font-medium text-gray-900 ${
                                !n.read ? "font-semibold" : ""
                              }`}
                            >
                              {n.title || "New Notification"}
                            </span>

                            {/* Unread Dot */}
                            {!n.read && (
                              <span className="w-2 h-2 bg-blue-500 rounded-full inline-block"></span>
                            )}
                          </div>

                          {/* Body */}
                          <p className="text-gray-600 text-sm leading-snug">{n.body}</p>

                          {/* Mark as Read Button */}
                          {!n.read && (
                            <button
                              onClick={() => handleRead(n.id)}
                              className="self-end mt-2 text-xs px-3 py-1 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                            >
                              Mark as read
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="p-6 text-center text-gray-400">
                      <i className="fas fa-bell-slash text-2xl mb-2 block"></i>
                      <p>No notifications</p>
                    </div>
                  )}
                </div>
              )}

            </div>

             {/* Profile Icon */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="focus:outline-none"
              >
                <div className="flex flex-col items-center">
                  <i className="fas fa-user-circle text-4xl text-gray-700 hover:text-blue-600"></i>
                  {/* <p>user</p> */}
                </div>
              </button>

              {profileMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto
                  transform transition-all duration-300 ease-out scale-y-100 origin-top`}
                >
                   <h4 className="font-bold p-3 border-b border-gray-200 text-gray-700 text-lg">Settings</h4>
                  <button
                    onClick={() => {
                      setProfilePopupOpen(true);
                      setProfileMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Profile Settings
                  </button>
                  <button
                    onClick={() => {
                      sessionStorage.removeItem("authToken");
                      window.location.href = "/";
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
