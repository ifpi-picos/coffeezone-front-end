import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import styles from "./App.module.css";
import SignUp from "./components/pages/SignUp";

export default function App () {
  return(
    <div className={styles.app}>
      <BrowserRouter>
        <Routes>
          <Route path="/signUp" element={<SignUp />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  )
}