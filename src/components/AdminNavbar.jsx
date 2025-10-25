import React, { useState , useRef , useEffect} from "react";
import logo from "../assets/logo2.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from "react-router-dom";
import CreateNotification from "./CreateNotification";
import NotificationBell from "./NotificationBell";
import { Settings2 , CreditCard } from 'lucide-react';
import ChangePassword from "./ChangePassword";

export default function AdminNavbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [profilePopupOpen, setProfilePopupOpen] = useState(false);
  // const [notifOpen, setNotifOpen] = useState(false); 
  const token = sessionStorage.getItem("authToken");

  const profileRef = useRef();
  const notifRef = useRef();
  const [notifications, setNotifications] = useState([]);
  
  const navigate = useNavigate();

    // Close dropdowns when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileRef.current && !profileRef.current.contains(event.target)) {
          setProfileMenuOpen(false);
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
              <img
                src={logo}
                alt="Logo"
                className="h-30 w-30"
              />
            </a>
          </div>

          {/* Navigation Links */}
        <div className="flex items-center justify-center space-x-8 text-center">
          <NotificationBell />
          <Settings2
            className="w-6 h-6 text-gray-800 cursor-pointer"
            onClick={() => navigate("/settings")}
          />

          <CreditCard 
            className="w-6 h-6 text-gray-800 cursor-pointer"
            onClick={() => navigate("/payment_approve")}
          
          />


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
                    onClick={() => (window.location.href = "/change-password")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                     Change Password
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
            {/* Profile Settings Popup */}
            
        </div>

        </div>
      </div>
    </nav>
  );
}
