import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

import "./App.css";

function App() {
  const [loading, setLoading] = React.useState(false);
  const [textToAnalyze, setTextToAnalyze] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [toneData, setToneData] = useState(null);
  const [subData, setSubData] = useState(null);

  const analyzeText = async () => {
    setLoading(true);
    const response = await axios.post("http://localhost:5000/tone", {
      text: textToAnalyze,
    });
    console.log(response.data);
    setToneData(response.data);
    if (isChecked) {
      const response = await axios.get(
        `https://us-central1-saloni-shivdasani.cloudfunctions.net/subjectivity-analyzer?text=${textToAnalyze}`,
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
          },
        }
      );
      setSubData(response);
    }
    setLoading(false);
  };

  const displayToneData = () => {
    console.log(toneData);
    return <h1>hi</h1>;
  };
  const displaySubData = () => {
    return <h1>hi</h1>;
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

      <TextField
        placeholder="Enter text to be analyzed here..."
        multiline
        rows={4}
        value={textToAnalyze}
        onChange={handleChange}
        variant="filled"
      />
      <Button
        variant="contained"
        color="primary"
        disabled={loading}
        onClick={analyzeText}
      >
        Analyze
        {loading && <CircularProgress size={24} />}
      </Button>
      {toneData && displayToneData()}
      {subData && displaySubData()}
    </div>
  );
}

export default App;
