import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";

import "./App.css";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [textToAnalyze, setTextToAnalyze] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [data, setData] = useState(null);

  const analyzeText = async () => {
    setLoading(true);
    console.log("Analyzing", textToAnalyze);
    if (isChecked) {
      const response = await axios.get(
        `https://us-central1-saloni-shivdasani.cloudfunctions.net/subjectivity-analyzer?text=${textToAnalyze}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      );
      console.log(response);
    }
    setData("test");
    setLoading(false);
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
          checked={isChecked}
          onChange={() => setIsChecked(!isChecked)}
          color="primary"
        />
      </div>

      <input type="text" value={textToAnalyze} onChange={handleChange} />
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={analyzeText}
      >
        Analyze
        {loading && <CircularProgress size={24} />}
      </Button>
    </div>
  );
}

export default App;
