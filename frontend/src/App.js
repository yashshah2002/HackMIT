import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import axios from "axios";
import "./App.css";

function App() {
  let [textToAnalyze, setTextToAnalyze] = useState("");

  const analyzeText = async () => {
    console.log("Analyzing", textToAnalyze);
    const response = await axios.get(
      `https://us-central1-saloni-shivdasani.cloudfunctions.net/subjectivity-analyzer?text=${textToAnalyze}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "http://localhost:3000",
        },
      }
    );
    console.log(response);
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setTextToAnalyze(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <input type="text" value={textToAnalyze} onChange={handleChange} />
        <button onClick={() => analyzeText()}>Analyze</button>
      </header>
    </div>
  );
}

export default App;
