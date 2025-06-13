import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import Employee from "../components/Employee";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<AuthForm isSignup={true} />} />
      <Route path="/login" element={<AuthForm isSignup={false} />} />
      <Route path="/employees" element={<PrivateRoute><Employee /></PrivateRoute>} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}