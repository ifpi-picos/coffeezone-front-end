import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/pages/SignUp/SignUp";
import Login from "./components/pages/Login/Login";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Profile from "./components/pages/Profile/Profile";
import { UserStorage } from "./store/UserContext";
import ProtectedRoutes from './utils/ProtectedRoutes';

export default function App () {
  return(
    <div className="app">
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