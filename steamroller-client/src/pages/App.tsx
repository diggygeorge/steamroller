import React from "react";
import "./App.css";
import logo from "../assets/steam-logo.svg";

import { on } from "events";
import { Route, Routes, Link, useNavigate, Navigate, } from "react-router-dom";

import RecommendationList from "./RecommendationList";



function onClick() {
  
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Steamroller</h1>
        <button onClick={() => onClick()} className="sign-in-button">
          <p>Sign in with Steam</p>
          <img src={logo} className="App-logo" alt="logo" />
        </button>
      </header>
    </div>
  );
}



export default App;
