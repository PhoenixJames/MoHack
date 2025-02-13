import React, { useState, useEffect } from "react";
import { Typography, Button, Box, TextField, Grid, Slide } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import GradientBackground from "./GradientBackground";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showVoiceRecognition, setShowVoiceRecognition] = useState(false);
  
  const [showAnimation, setShowAnimation] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  
  
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
        setShowAnimation(true); 
        
        setTimeout(() => {
          navigate("/byebye"); 
        }, 3000);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [navigate]);
  
  useEffect(() => {
    if (showVoiceRecognition && browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening();
    }
  }, [showVoiceRecognition, browserSupportsSpeechRecognition]);
  
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
    startListening();
    return () => SpeechRecognition.stopListening();
  }, []);
  
  useEffect(() => {
    console.log("Speech recognition", transcript);
    if (transcript.toLowerCase().includes("dan") || transcript.toLowerCase().includes("10") || transcript.toLowerCase().includes("done")|| transcript.toLowerCase().includes("then") || transcript.toLowerCase().includes("confirm") || transcript.toLowerCase().includes("cool") || transcript.toLowerCase().includes("go") || transcript.toLowerCase().includes("call")) {
      setShowAnimation(true); 
      setTimeout(() => {
        navigate("/byebye"); 
      }, 3000);
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
  

  
    <Typography variant="h4" sx={{ marginBottom: "20px" }}>
      Here is your profile
    </Typography>
  
    
    <Grid
    container
    spacing={3}
    sx={{
      width: "100%",
      maxWidth: "95%", // Always take full width
      background: "rgba(255, 255, 255, 0.3)",
      padding: "10px",
      borderRadius: "12px",
      margin: "0 auto", 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      maxHeight: "calc(100vh - 20px)", // Ensure full vertical scroll area
      overflowY: "auto", // Add vertical scrollbar
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
    
    <Grid item xs={12} md={8}>
    {/* Name Field */}
    <Grid container spacing={2} sx={{ marginBottom: "10px" }}>
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
      color: "#fff",
      borderRadius: "8px",
      "& .MuiInputBase-input": {
        color: "#fff", 
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6A4C93",  // Border color
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
      color: "#fff",
      borderRadius: "8px",
      "& .MuiInputBase-input": {
        color: "#fff", 
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6A4C93",  // Border color
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
      color: "#fff",
      borderRadius: "8px",
      "& .MuiInputBase-input": {
        color: "#fff", 
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6A4C93",  // Border color
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
      color: "#fff",
      borderRadius: "8px",
      "& .MuiInputBase-input": {
        color: "#fff", 
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6A4C93",  // Border color
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
      color: "#fff",
      borderRadius: "8px",
      "& .MuiInputBase-input": {
        color: "#fff", 
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6A4C93",  // Border color
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
      color: "#fff",
      borderRadius: "8px",
      "& .MuiInputBase-input": {
        color: "#fff", 
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "#6A4C93",  // Border color
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
    
    <Grid item xs={12} sx={{ marginTop: "10px", textAlign: "center" }}>
    <Typography variant="h6" sx={{ marginBottom: "10px" }}>Signature</Typography>
    <img src={location.state.signature} alt="Signature" style={{ maxWidth: "100%", height: "auto", borderRadius: "8px", border: "2px solid #ccc" }} />
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
    Confirm
    </Button>
    
    <Slide direction="up" in={showVoiceRecognition} mountOnEnter unmountOnExit>
    <Grid container spacing={2} sx={{ padding: "10px", color: "#f8f8f8", borderRadius: "8px", marginTop: "10px" }}>
    <Grid item xs={12}>
    <Typography variant="h6">Listening...</Typography>
    <TextField
    fullWidth
    multiline
    variant="outlined"
    value={transcript}
    onChange={resetTranscript}
    sx={{
      color: "#fff",
      borderRadius: "8px",
      
    }}
    />
    <Button
    variant="contained"
    onClick={handleCloseVoiceRecognition}
    sx={{
      
      color: "#fff",
      fontSize: "1rem",
      padding: "10px 30px",
      borderRadius: "8px",
      marginTop: "10px",
      "&:hover": {
        color: "#FF3B3B",
      },
    }}
    >
    Stop Listening
    </Button>
    </Grid>
    </Grid>
    </Slide>
    </Grid>
    </GradientBackground>
  );
};

export default Result;
