import React from "react";
import "./App.css";
import logo from "../assets/steam-logo.svg";

import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/recommendations");
  };

  return (
    <div className="App">
          <div className="box">
            <h1 className="top-of-screen">Steamroller</h1>
            <button onClick={onClick} className="sign-in-button">
              <p>Sign in with Steam</p>
              <img src={logo} className="App-logo" alt="logo" />
            </button>
          </div>
    </div>
  );
}

export default App;
