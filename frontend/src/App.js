import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
    console.log(tone.tone_id);
    switch (tone.tone_id) {
      case "analytic":
        return "blue";
      case "tentative":
        return "green";
      case "joy":
        return "blue";
      case "sadness":
        return "red";
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
      if (sentence.tones.length === 0) return <span>{sentence.text} </span>;
      return (
        <span
          className={getColor(
            sentence.tones.reduce((prev, current) => {
              return prev.score > current.score ? prev : current;
            })
          )}
        >
          {sentence.text}{" "}
        </span>
      );
    });

    return (
      <Card width="70%">
        <CardContent>
          {overallTone} <p>{lineByLine}</p>
        </CardContent>
      </Card>
    );
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
      <Container>
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
      </Container>
    </div>
  );
}

export default App;
