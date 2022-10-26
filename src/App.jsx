import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import styles from "./App.module.css";
import SignUp from "./pages/SignUp/SignUp";
import Login from "./pages/Login/Login";
import { UserStorage } from "./store/UserContext";

export default function App () {
  return(
    <div className={styles.app}>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/cadastro" element={<SignUp />} /> 
            <Route path="/login" element={<Login />} /> 
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}