import React, { useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientBackground from "./GradientBackground";
import "./Dictaphone.css"; // Import CSS for styles

const Dictaphone = () => {
  const navigate = useNavigate();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  
  useEffect(() => {
    // Automatically start listening on mount
    SpeechRecognition.startListening({ continuous: true });
    
    return () => {
      // Stop listening when component unmounts
      SpeechRecognition.stopListening();
    };
  }, []);
  
  useEffect(() => {
    const lowerCaseTranscript = transcript.toLowerCase();
    
    // Prevent navigation if transcript contains "don't start" or "no start"
    if (lowerCaseTranscript.includes("don't start") || lowerCaseTranscript.includes("no start")) {
      return;
    }
    
    // Navigate if "start" is detected
    if (lowerCaseTranscript.includes("start") || lowerCaseTranscript.includes("go")) {
      navigate("/smile-detection");
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
    <Typography variant="h2" className="fade-in" >
    Voice Recognition
    </Typography>
    
    <Typography variant="h6" sx={{mt:5}}>
    Microphone: {listening ? "ON" : "OFF"}
    </Typography>
    
    {/* Transcription Box */}
    <Box className="transcription-box" sx={{mt:3}}>
    <Typography variant="body1">
    {transcript || "Start speaking..."}
    </Typography>
    </Box>
    
  <Box sx={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
  <Button
  variant="contained"
  onClick={() => SpeechRecognition.startListening({ continuous: true })}
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
    <Box className="instructions">
    <Typography variant="h6">Please say the following to proceed to the next stage:</Typography>
    <ul className="instruction-list">
    <li>🗣️ <span className="glow">"Let's start"</span></li>
    <li>🗣️ <span className="glow">"Let's go"</span></li>
    </ul>
    
    </Box>
    
    {/* Back Button */}
    <Button
    onClick={() => navigate("/")}
    className="back-button"
    >
    Back
    </Button>
    </GradientBackground>
  );
};

export default Dictaphone;


