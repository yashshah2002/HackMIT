const express = require("express");
const router = express.Router();

const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3");
const { IamAuthenticator } = require("ibm-watson/auth");

const toneAnalyzer = new ToneAnalyzerV3({
  version: "2017-09-21",
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_TONE,
  }),
  serviceUrl: "https://api.us-south.tone-analyzer.watson.cloud.ibm.com",
});

const text =
  "Team, I know that times are tough! Product " +
  "sales have been disappointing for the past three " +
  "quarters. We have a competitive product, but we " +
  "need to do a better job of selling it!";

const toneParams = {
  toneInput: { text: text },
  contentType: "application/json",
};

router.get("/", async (req, res, next) => {
  let toneAnalysis;
  try {
    toneAnalysis = await toneAnalyzer.tone(toneParams);
  } catch (err) {
    console.log(err);
  }
  console.log(JSON.stringify(toneAnalysis, null, 2));
  return res.status(200).json(toneAnalysis);
});

module.exports = router;
