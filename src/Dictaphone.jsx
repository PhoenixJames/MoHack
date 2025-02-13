import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientBackground from "./GradientBackground";
import "./Dictaphone.css"; // Import CSS for styles
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import TextToSpeech from "./TextToSpeech";

const Dictaphone = () => {
  const navigate = useNavigate();
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space') {  
        event.preventDefault();  
        resetTranscript();
        window.location.reload();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [resetTranscript]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'ArrowRight') {  
        event.preventDefault();
        navigate("/service");
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);

  const startListening = async () => {
    try {
      await SpeechRecognition.startListening({ continuous: true });
    } catch (error) {
      window.location.reload();
      console.error("Failed to start listening:", error);
    }
  };


  useEffect(() => {
    if (!listening) {
      startListening();
    }
  }, [listening]);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => SpeechRecognition.stopListening();
  }, []);
  
  useEffect(() => {
    const lowerCaseTranscript = transcript.toLowerCase();
    // if (lowerCaseTranscript.includes("don't start") || lowerCaseTranscript.includes("no start")) return;
    if (lowerCaseTranscript.includes("start") || lowerCaseTranscript.includes("go") || lowerCaseTranscript.includes("cool")) {
      navigate("/service");
    }
  }, [transcript, navigate]);
  
  if (!browserSupportsSpeechRecognition) {
    return <Typography variant="h6">Browser doesn't support speech recognition.</Typography>;
  }
  
  return (
    <GradientBackground>
      <div className="overlay-container">
     
        <Typography variant="h2" className="fade-in">
          <TextToSpeech textData="How can i help you?" />
        </Typography>
      </div>

      <Typography variant="h6" sx={{ mt: 5 }}>
        Microphone: {listening ? "ON" : "OFF"}
      </Typography>

      <Box className="transcription-box" sx={{ mt: 3 }}>
      <DotLottieReact
      src="https://lottie.host/24315427-b18f-4be9-9ccf-19a02d4a76bb/nR8BxcbI6H.lottie"
      loop
      autoplay
    />
        <Typography variant="body1" style={{marginTop:"-50px", fontSize: "20px"}}>{transcript || "Start speaking..."}</Typography>
      </Box>

      {/* <Box sx={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
        <Button variant="contained" 
         onClick={() => {
          resetTranscript();
          window.location.reload();
        }}
         sx={{ backgroundColor: "transparent", color: "#000" }}>
          Reset
        </Button>
      </Box> */}

      <Box className="instructions">
        <Typography variant="h6">Please say the following to proceed to the next stage:</Typography>
        <ul className="instruction-list">
          {/* <li>🗣️ <span className="glow">"Let's start"</span></li> */}
          <li>🗣️ <span className="glow">"Let's go"</span></li>
        </ul>
      </Box>

      <Button onClick={() => navigate("/")} className="back-button">
        Back
      </Button>
    </GradientBackground>
  );
};

export default Dictaphone;
