import React from "react";
import logo from "../assets/logo2.jpg"
export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-36 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 ">
            <a href="/" className="flex items-start">
              <img
                src={logo} // <-- Replace with your logo path
                alt="Logo"
                className="h-30 w-30"
              />
              {/* <span className="ml-2 text-xl font-bold text-gray-800">
                MyApp
              </span> */}
            </a>
          </div>

          {/* Nav Links */}
          {/* <div className="hidden md:flex space-x-6">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Services", href: "/services" },
              { name: "Pricing", href: "/pricing" },
              { name: "Contact", href: "/contact" },
            ].map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 hover:scale-105 transition transform duration-200 font-medium"
              >
                {link.name}
              </a>
            ))}
          </div> */}

          {/* Call to Action Button */}
          {/* <div className="hidden md:flex">
            <a
              href="/signup"
              className="bg-[#b61825] text-white px-4 py-2 rounded-xl shadow hover:bg-black transition duration-200"
            >
              SignUp
            </a>
          </div> */}

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {/* Hamburger Icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
