import React, { useState } from "react";
import logo from "../assets/logo2.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, useNavigate } from "react-router-dom";
import CreateNotification from "./CreateNotification";
import NotificationBell from "./NotificationBell";
import { Settings2 } from 'lucide-react';

export default function AdminNavbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);
  const navigate = useNavigate();

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
        </div>

        </div>
      </div>
    </nav>
  );
}
