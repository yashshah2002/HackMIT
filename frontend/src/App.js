import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";

function App() {
  let [textToAnalyze, setTextToAnalyze] = useState("");
  let [subjectivity, setSubjectivity] = useState(0.0);

  const analyzeText = async () => {
    console.log("Analyzing", textToAnalyze);
    const response = await axios.get(
      `http://localhost:5000/subjectivity?text=${textToAnalyze}`
    );
    setSubjectivity(response.data.subjectivity);
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
        <Checkbox color="primary" />
      </div>

      <input type="text" value={textToAnalyze} onChange={handleChange} />
      <button onClick={() => analyzeText()}>Analyze</button>
    </div>
  );
}

export default App;
