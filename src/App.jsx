import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import styles from "./App.module.css";
import SignUp from "./pages/SignUp/SignUp";
import { UserStorage } from "./store/UserContext";

export default function App () {
  return(
    <div className={styles.app}>
      <BrowserRouter>
        <UserStorage>
          <Routes>
            <Route path="/cadastro" element={<SignUp />} /> 
          </Routes>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}