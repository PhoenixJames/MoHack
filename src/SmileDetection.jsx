import React, { useEffect, useRef, useState } from "react";
//import * as faceapi from "face-api.js";
import * as faceapi from '@vladmandic/face-api';

import {
  Button,
  Typography,
  Box,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientBackground from "./GradientBackground";
import TextToSpeech from "./TextToSpeech";



const SmileDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        ]);
        startVideo();
      } catch (error) {
        console.error("Error loading face-api models:", error);
      }
    };

    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  const handleVideoPlay = async () => {
    setInterval(async () => {
      if (videoRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (detections.length > 0) {
          detections.forEach((detection) => {
            const happyExpression = detection.expressions.happy;
            console.log("happyExpression",happyExpression)
            if (happyExpression > 0.7) {
              captureImage();
            }
          });
        }
      }
    }, 1000); // Check every second
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      setCapturedImage(canvas.toDataURL("image/png"));
    }
  };

  useEffect(() => {
    if (capturedImage) {
      navigate("/signature", { state: { capturedImage } });
    }
  }, [capturedImage, navigate]);

  return (
    <GradientBackground>
      <Typography variant="h2">Smile Detection</Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        <TextToSpeech textData="Look at the camera and smile to capture your image!" />
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        <Grid
          item
          xs={12}
          sm={6}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.2)",
              padding: "5px",
              borderRadius: "8px",
              width: "100%",
              maxWidth: "600px",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              onPlay={handleVideoPlay}
              width="100%"
              height="auto"
              style={{ borderRadius: "8px", marginBottom: "15px" }}
            />
            <canvas ref={canvasRef} style={{ display: "none" }} />
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={openDialog}
        sx={{
          ".MuiPaper-root": {
            background: "rgba(0, 0, 0, 0.8)",
            borderRadius: "12px",
            color: "#fff",
            padding: "20px",
          },
        }}
      >
        <DialogContent>
          <Typography
            sx={{ fontSize: "1.2rem", textAlign: "center", fontWeight: "bold" }}
          >
            Smile Detected! Proceed to the next step?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              background: "#FF6B6B",
              color: "#fff",
              borderRadius: "8px",
              padding: "8px 16px",
              "&:hover": { background: "#FF4040" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => navigate("/result", { state: { capturedImage } })}
            sx={{
              background: "#4CAF50",
              color: "#fff",
              borderRadius: "8px",
              padding: "8px 16px",
              "&:hover": { background: "#45A045" },
            }}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </GradientBackground>
  );
};

export default SmileDetection;
