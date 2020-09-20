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
    setToneData(response.data);
    if (isChecked) {
      const response = await axios.get(
        `http://localhost:5000/subjectivity?text=${textToAnalyze}`
      );
      setSubData(response.data.subjectivity);
    }
    setLoading(false);
  };

  const getColor = (tone) => {
    switch (tone.tone_id) {
      case "analytic":
        return "blue";
      case "tentative":
        return "green";
      default:
        return "black";
    }
  };

  const displayToneData = () => {
    console.log(toneData.document_tone.tones);
    const overallTone = toneData.document_tone.tones.map((tone) => (
      <h3>
        {tone.tone_name} - {Math.floor(tone.score * 100)}%
      </h3>
    ));

    const lineByLine = toneData.sentences_tone.map((sentence) => {
      if (sentence.tones.length === 0) return <span>{sentence.text}</span>;
      return (
        <span
          className={getColor(
            sentence.tones.reduce((a, b) => Math.max(a.score, b.score))
          )}
        >
          {sentence.text}
        </span>
      );
    });

    return (
      <div>
        {overallTone} <p>{lineByLine}</p>
      </div>
    );
  };

  const displaySubData = () => {
    return <h1>hi</h1>;
  };

  const handleChange = (event) => {
    const newValue = event.target.value;
    setTextToAnalyze(newValue);
  };

  const [type, setType] = useState('');

  const typeChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="App">
      <h1>Tonus</h1>
      <div>
        Type
        <Select value={type} onChange={typeChange} style={{ margin: "1rem"}}>
          <MenuItem value="Text">Text</MenuItem>
          <MenuItem value="Audio">Audio</MenuItem>
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
