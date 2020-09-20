const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const toneRoutes = require("./routes/tone-routes");
const subjRoutes = require("./routes/subjectivity-routes");
const s2tRoutes = require("./routes/speech-to-text");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).json({ test: "hi" });
});
app.use("/tone", toneRoutes);
app.use("/subjectivity", subjRoutes);
app.use("/s2t", s2tRoutes);

app.listen(5000);
