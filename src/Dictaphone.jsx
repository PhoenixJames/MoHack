import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientBackground from "./GradientBackground";

const Dictaphone = () => {
  const navigate = useNavigate();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript.toLowerCase().includes("start")) {
      navigate("/smile-detection"); // Redirect to Smile Detection page
    }
  }, [transcript, navigate]);

  if (!browserSupportsSpeechRecognition) {
    return (
      <Typography variant="h6">
        Browser doesn't support speech recognition.
      </Typography>
    );
  }

  return (
    <GradientBackground>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Voice Recognition
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: "20px" }}>
        Microphone: {listening ? "ON" : "OFF"}
      </Typography>

      <Box sx={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <Button
          variant="contained"
          onClick={SpeechRecognition.startListening}
          sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
        >
          Start
        </Button>
        <Button
          variant="contained"
          onClick={SpeechRecognition.stopListening}
          sx={{ backgroundColor: "#E63946", color: "#fff" }}
        >
          Stop
        </Button>
        <Button
          variant="contained"
          onClick={resetTranscript}
          sx={{ backgroundColor: "#FFD166", color: "#000" }}
        >
          Reset
        </Button>
      </Box>

      <Box
        sx={{
          backgroundColor: "rgba(255,255,255,0.2)",
          padding: "15px",
          borderRadius: "8px",
          width: "80%",
          maxWidth: "600px",
          wordBreak: "break-word",
        }}
      >
        <Typography variant="body1">
          {transcript || "Start speaking..."}
        </Typography>
      </Box>

      <Button
        onClick={() => navigate("/home")}
        sx={{
          marginTop: "30px",
          backgroundColor: "#2C2C54",
          color: "#fff",
          "&:hover": { backgroundColor: "#1B1B3A" },
        }}
      >
        Back
      </Button>
    </GradientBackground>
  );
};

export default Dictaphone;
