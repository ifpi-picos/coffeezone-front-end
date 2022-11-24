import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./app.css";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/Dashboard";
import Profile from "./components/pages/Profile";
import { UserStorage } from "./store/UseContext";
import ProtectedRoutes from './utils/ProtectedRoutes';

export default function App () {
  return(
    <div className="min-h-[100vh] h-full bg-white py-[4.75rem] px-5 flex">
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/cadastro" element={<SignUp />} /> 
            <Route path="/login" element={<Login />} /> 
            <Route element={<ProtectedRoutes />}> 
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/perfil" element={<Profile />} />
            </Route>
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}