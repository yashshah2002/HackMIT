const express = require("express");
const router = express.Router();
const fs = require("fs");
const { IamAuthenticator } = require("ibm-watson/auth");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: process.env.IBM_S2T,
  }),
  serviceUrl: "https://api.us-south.speech-to-text.watson.cloud.ibm.com",
});

const recognizeParams = {
  audio:
    "https://sampleswap.org/samples-ghost/VOCALS%20and%20SPOKEN%20WORD/Voicemail%20Messages/256[kb]angry-customer-resolve-my-fckn-issue.mp3",
  contentType: "audio/mpeg",
  wordAlternativesThreshold: 0.9,
};

router.get("/", async (req, res, next) => {
  await speechToText
    .recognize(recognizeParams)
    .then((speechRecognitionResults) => {
      console.log(JSON.stringify(speechRecognitionResults, null, 2));
    })
    .catch((err) => {
      console.log("error:", err);
    });
  console.log("Hello");
  return res.status(200).json({ test: "test" });
});

module.exports = router;
