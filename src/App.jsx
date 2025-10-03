// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



// import { useState } from "react";
// import LoginCard from "./components/LoginCard";
// import Dashboard from "./components/Dashboard";

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       {!isLoggedIn ? (
//         <LoginCard onLogin={() => setIsLoggedIn(true)} />
//       ) : (
//         <Dashboard />
//       )}
//     </div>
//   );
// }


// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginCard from "./components/LoginCard";
// import SignUp from "./components/SignUp";
// import Dashboard from "./components/Dashboard";
// import PaymentForm from "./components/PaymentForm";
// import "./index.css"; // Tailwind CSS
// import SignUpWithDetails from "./components/SignUpWithDetails"

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginCard />} />
//         <Route path="/signup" element={<SignUpWithDetails />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/payment_details" element={<PaymentForm />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginCard from "./components/LoginCard";
import SignUpWithDetails from "./components/SignUpWithDetails";
import Dashboard from "./components/Dashboard";
import PaymentForm from "./components/PaymentForm";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginCard />} />
        <Route path="/signup" element={<SignUpWithDetails />} />

        {/* Role-based protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute role="user">
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <h1>Admin Dashboard</h1>
            </PrivateRoute>
          }
        />

        



        <Route
          path="/payment_details"
          element={
            <PrivateRoute role="user">
              <PaymentForm />
            </PrivateRoute>
          }
        />

        <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
