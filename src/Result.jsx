import React, { useState, useEffect } from "react";
import { Typography, Button, Box, TextField, Grid, Slide } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import GradientBackground from "./GradientBackground";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  
  useEffect(() => {
    if (showVoiceRecognition && browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening();
    }
  }, [showVoiceRecognition, browserSupportsSpeechRecognition]);
  
  useEffect(() => {
    if (transcript.toLowerCase().includes("confirm")) {
      navigate("/byebye");
    } else if (transcript.toLowerCase().includes("cancel")) {
      setShowVoiceRecognition(false);
    }
  }, [transcript, navigate]);
  
  const handleDoneClick = () => {
    setShowVoiceRecognition(true);
  };
  
  const handleCloseVoiceRecognition = () => {
    setShowVoiceRecognition(false);
    SpeechRecognition.stopListening();
  };
  
  if (!browserSupportsSpeechRecognition) {
    return (
      <Typography variant="h6">
      Browser doesn't support speech recognition.
      </Typography>
    );
  }
  
  return (
    <GradientBackground>
    <Typography variant="h2" sx={{ marginBottom: "20px" }}>
    Here is your profile
    </Typography>
    
    <Grid
    container
    spacing={3}
    sx={{
      
      width: "100%",
      maxWidth: "95%", // Always take full width
      background: "rgba(255, 255, 255, 0.3)",
      padding: "20px",
      borderRadius: "12px",
      margin: "0 auto", // Add side margins to allow border radius to show
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
    <Grid
    item
    xs={12}
    md={4}
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    >
    <Box
    sx={{
      // width: "100%",
      maxWidth: "400px",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    }}
    >
    {location.state?.capturedImage && (
      <img
      src={location.state.capturedImage}
      alt="Captured"
      style={{
        width: "100%",
        height: "auto",
      }}
      />
    )}
    </Box>
    </Grid>
    
    <Grid item xs={12} md={8} > 
    {/* Name Field */}
    <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
    <Grid
    item
    xs={3}
    sx={{ textAlign: "right", display: "flex", alignItems: "center" }}
    >
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    Name:
    </Typography>
    </Grid>
    <Grid item xs={9}>
    <TextField
    fullWidth
    value="Mg Mg"
    variant="outlined"
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
    
    {/* NRIC Field */}
    <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
    <Grid
    item
    xs={3}
    sx={{ textAlign: "right", display: "flex", alignItems: "center" }}
    >
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    NRIC:
    </Typography>
    </Grid>
    <Grid item xs={9}>
    <TextField
    fullWidth
    value="1/AaBbCc(N)111111"
    variant="outlined"
    sx={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#FF6B6B",
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
    
    {/* Phone Field */}
    <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
    <Grid
    item
    xs={3}
    sx={{ textAlign: "right", display: "flex", alignItems: "center" }}
    >
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    Phone No:
    </Typography>
    </Grid>
    <Grid item xs={9}>
    <TextField
    fullWidth
    value="099xxxxxxxx"
    variant="outlined"
    sx={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#FFD166",
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
    
    {/* Address Field */}
    <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
    <Grid
    item
    xs={3}
    sx={{ textAlign: "right", display: "flex", alignItems: "center" }}
    >
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    Address:
    </Typography>
    </Grid>
    <Grid item xs={9}>
    <TextField
    fullWidth
    value="Yangon, Myanmar"
    variant="outlined"
    sx={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6A4C93",
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
    
    {/* Username Field */}
    <Grid container spacing={2} sx={{ marginBottom: "16px" }}>
    <Grid
    item
    xs={3}
    sx={{ textAlign: "right", display: "flex", alignItems: "center" }}
    >
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    Username:
    </Typography>
    </Grid>
    <Grid item xs={9}>
    <TextField
    fullWidth
    value="mgmg123"
    variant="outlined"
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
    
    {/* Member Code Field */}
    <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
    <Grid
    item
    xs={3}
    sx={{ textAlign: "right", display: "flex", alignItems: "center" }}
    >
    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
    Member Code:
    </Typography>
    </Grid>
    <Grid item xs={9}>
    <TextField
    fullWidth
    value="MMC009"
    variant="outlined"
    sx={{
      backgroundColor: "#fff",
      borderRadius: "8px",
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#FF6B6B",
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
    </Grid>
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
    Done
    </Button>
    </Grid>
    
    <Slide
    direction="left"
    in={showVoiceRecognition}
    mountOnEnter
    unmountOnExit
    >
    <Box
    sx={{
      position: "fixed",
      right: 0,
      top: 0,
      height: "100vh",
      width: "300px",
      backgroundColor: "rgba(0, 0, 0, 0.9)",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      textAlign: "center",
      opacity: 0.9,
    }}
    >
    <Button
    onClick={handleCloseVoiceRecognition}
    sx={{
      position: "absolute",
      top: "10px",
      right: "10px",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      color: "#fff",
      borderRadius: "50%",
      width: "30px",
      height: "30px",
      minWidth: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      "&:hover": {
        backgroundColor: "rgba(0, 0, 0, 0.7)",
      },
    }}
    >
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
    X
    </Typography>
    </Button>
    <Typography
    variant="h5"
    sx={{ marginBottom: "10px", fontWeight: "bold" }}
    >
    Voice Recognition
    </Typography>
    <Typography>Say "Confirm" or "Cancel"</Typography>
    </Box>
    </Slide>
    </GradientBackground>
  );
};

export default ResultPage;
