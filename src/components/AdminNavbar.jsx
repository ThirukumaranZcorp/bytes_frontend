import React, { useState } from "react";
import logo from "../assets/logo2.jpg";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function AdminNavbar() {
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
        </div>
      </div>


    </nav>
  );
}
