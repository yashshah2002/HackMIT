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

router.post("/", async (req, res, next) => {
  let toneAnalysis;
  try {
    toneAnalysis = await toneAnalyzer.tone({
      toneInput: { text: req.body.text },
      contentType: "application/json",
    });
  } catch (err) {
    console.log("Error: " + err);
  }
  return res.status(200).json(toneAnalysis.result);
});

module.exports = router;
