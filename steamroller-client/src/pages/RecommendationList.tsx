import React from "react";

import "./RecommendationList.css";

function onClick() {}

function RecommendationList() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="main-header">Steamroller</h1>
        <h2 className="sub-header">Recommendations</h2>
        <div className="box">
          <div className="recommendation-list">
            <div className="recommendation">
              <img
                src="https://cdn.cloudflare.steamstatic.com/steam/apps/730/capsule_184x69.jpg?t=1630485376"
                alt="Counter   Strike: Global Offensive"
              />
              <p>Counter Strike: Global Offensive</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default RecommendationList;
