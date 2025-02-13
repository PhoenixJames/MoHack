import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { useLocation, useNavigate } from "react-router-dom";
import GradientBackground from "./GradientBackground";
import {
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import TextToSpeech from "./TextToSpeech";

function Signature() {
  const sigCanvasRef = React.useRef();
  const [isSigned, setIsSigned] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const capturedImage = location.state?.capturedImage;

  const clearSignature = () => {
    sigCanvasRef.current.clear();
    setIsSigned(false); // Reset the signature status
  };

  const confirmSignature = () => {
    if (sigCanvasRef.current.isEmpty()) {
      alert("Please draw your signature before confirming.");
    } else {
      setIsSigned(true);
   
     navigate("/result", { state: { capturedImage, signature: sigCanvasRef.current.toDataURL() } });
      
    }
  };

  return (
    <GradientBackground>
      <Typography variant="h4" gutterBottom sx={{mb:10}}>
        <TextToSpeech textData="Please Draw Your Signature" />
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <SignatureCanvas
          ref={sigCanvasRef}
          penColor="blue" // Signature color set to blue
          canvasProps={{
            width: 500,
            height: 200,
            className: "sigCanvas",
            style: { border: "2px solid #000", backgroundColor: "white" ,borderRadius: "5px",marginTop:"15px"}, // White background for the signature area
          }}
        />
      </Grid>

      <Box sx={{ display: "flex", gap: "15px", marginTop: "20px" }}>
        <Button
          variant="contained"
          onClick={clearSignature}
          sx={{ backgroundColor: "transparent", color: "#000" }}
        >
          Clear
        </Button>

        <Button
          variant="contained"
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
          onClick={confirmSignature}
          disabled={isSigned}
        >
          Confirm
        </Button>
      </Box>
    </GradientBackground>
  );
}

export default Signature;
