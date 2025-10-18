import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginCard from "./components/LoginCard";
import SignUpWithDetails from "./components/SignUpWithDetails";
import Dashboard from "./components/Dashboard";
import PaymentForm from "./components/PaymentForm";
import PrivateRoute from "./components/PrivateRoute";
import AdminDashboard from "./components/AdminDashboard";
import ProfileSettings from "./components/ProfileSettings";
import ChangePassword from "./components/ChangePassword";
import CreateNotification from "./components/CreateNotification";

import AdminSettings from "./components/AdminSettings";


function App() {
  const token = sessionStorage.getItem("authToken");
  const role = sessionStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        {/* Root path: check if logged in */}
        <Route
          path="/"
          element={
            token ? (
              role === "admin" ? (
                <Navigate to="/admin" />
              ) : (
                <Navigate to="/dashboard" />
              )
            ) : (
              <LoginCard />
            )
          }
        />
       
        <Route 
          path="/profile-settings" 
          element={        
            <PrivateRoute role="user">
              <ProfileSettings />
            </PrivateRoute>
          } 
        />
        

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
          path="/change-password"
          element={ <ChangePassword /> }
        />

        <Route
          path="/create-notification"
          element={
            <PrivateRoute role="admin">
              <CreateNotification />
            </PrivateRoute>
          }
        />



        <Route
          path="/settings"
          element={
            <PrivateRoute role="admin">
              <AdminSettings />
            </PrivateRoute>
          }
        />


        <Route
          path="/admin"
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
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
