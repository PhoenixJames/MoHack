import React, { useState, useEffect } from "react";
import { Typography, Button, Box, TextField, Grid, Slide } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import GradientBackground from "./GradientBackground";
import TextToSpeech from "./TextToSpeech";

const Information = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);
  
  const [name, setName] = useState("");
  const [nric, setNric] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [memberCode, setMemberCode] = useState("");
  
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
  
  const predefinedValues = {
    name: "Mg Mg",
    nric: "1/AaBbCc(N)111111",
    phone: "099xxxxxxxx",
    address: "Yangon, Myanmar",
    username: "mgmg123",
    memberCode: "MMC009",
  };
  
  
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'ArrowRight') {  
        event.preventDefault();
        navigate("/smile-detection");
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
      console.error("Failed to start listening:", error);
      window.location.reload();
    }
  };
  
  useEffect(() => {
    if (!listening) {
      startListening();
    }
  }, [listening]);
  
  useEffect(() => {
    const lowerCaseTranscript = transcript.toLowerCase();
    console.log("transcript",lowerCaseTranscript)
    if (lowerCaseTranscript.includes("continue") || lowerCaseTranscript.includes("next") || lowerCaseTranscript.includes("nice") || lowerCaseTranscript.includes("makes") ) {
      navigate("/smile-detection");
    }
  }, [transcript, navigate]);
  
  useEffect(() => {
    startListening(); 
    return () => SpeechRecognition.stopListening(); 
  }, []);
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setName(predefinedValues.name);
        setNric(predefinedValues.nric);
        setPhone(predefinedValues.phone);
        setAddress(predefinedValues.address);
        setUsername(predefinedValues.username);
        setMemberCode(predefinedValues.memberCode);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  const handleDoneClick = () => {
    setShowVoiceRecognition(true);
  };
  
  const handleCloseVoiceRecognition = () => {
    setShowVoiceRecognition(false);
    SpeechRecognition.stopListening();
  };
  
  if (!browserSupportsSpeechRecognition) {
    return <Typography variant="h6">Browser doesn't support speech recognition.</Typography>;
  }
  
  return (
    <GradientBackground>
    <Typography variant="h4" sx={{ marginBottom: "20px" }}>
    <TextToSpeech textData="Please fill out the following information" />
    </Typography>
    
    <Grid
    container
    spacing={3}
    sx={{
      width: "100%",
      maxWidth: "95%",
      background: "rgba(255, 255, 255, 0.3)",
      padding: "20px",
      borderRadius: "12px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
    {[
      { label: "Name", value: name, onChange: setName },
      { label: "NRIC", value: nric, onChange: setNric },
      { label: "Phone No", value: phone, onChange: setPhone },
      { label: "Address", value: address, onChange: setAddress },
      { label: "Username", value: username, onChange: setUsername },
      { label: "Member Code", value: memberCode, onChange: setMemberCode },
    ].map((field, index) => (
      <Grid container spacing={2} sx={{ marginBottom: "16px" }} key={index}>
      <Grid item xs={3} sx={{ textAlign: "right", display: "flex", alignItems: "center" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
      {field.label}:
      </Typography>
      </Grid>
      <Grid item xs={9}>
      <TextField
      fullWidth
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      variant="outlined"
      placeholder={`Enter ${field.label.toLowerCase()}`}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#4CAF50",
          },
          "&:hover fieldset": {
            borderColor: "#2C2C54",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#2C2C54",
          },
        },
      }}
      />
      </Grid>
      </Grid>
    ))}
    
    <Button
    variant="contained"
    onClick={handleDoneClick}
    sx={{
      backgroundColor: "#2C2C54",
      color: "#fff",
      fontSize: "1rem",
      padding: "10px 20px",
      borderRadius: "8px",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: "#1B1B3A",
      },
      marginLeft: "auto",
    }}
    >
    Continue
    </Button>
    </Grid>
    
    <Slide direction="left" in={showVoiceRecognition} mountOnEnter unmountOnExit>
    <Box
    sx={{
      position: "fixed",
      right: 0,
      top: 0,
      height: "100vh",
      width: "300px",
      backgroundColor: "#2C2C54",
      color: "#fff",
      padding: "20px",
      zIndex: 9999,
    }}
    >
    <Typography variant="h6">Listening...</Typography>
    <Typography variant="body1">{transcript}</Typography>
    <Button onClick={handleCloseVoiceRecognition} sx={{ marginTop: "20px", color: "#FFD700" }}>
    Stop Listening
    </Button>
    </Box>
    </Slide>
    </GradientBackground>
  );
};

export default Information;
