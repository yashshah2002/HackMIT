import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';

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
      <h1>Tonus</h1>
      <div>
        Type
        <Select>
          <MenuItem>Text</MenuItem>
          <MenuItem>Audio</MenuItem>
        </Select>
        Media Mode
        <Checkbox
            color="primary"
        />
      </div>

      <input type="text" value={textToAnalyze} onChange={handleChange} />
      <button onClick={() => analyzeText()}>Analyze</button>

    </div>
  );
}

export default App;
