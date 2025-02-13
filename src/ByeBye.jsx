import React, { useEffect, useRef, useState, useCallback } from "react";
import Confetti from "react-canvas-confetti";
import { Typography, Box } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import TextToSpeech from "./TextToSpeech";

const ByeBye = () => {
  const confettiRef = useRef(null);
  const [showLottie, setShowLottie] = useState(true);

  const getInstance = useCallback((instance) => {
    confettiRef.current = instance;
  }, []);

  const fireConfetti = useCallback(() => {
    if (confettiRef.current) {
      confettiRef.current({
        particleCount: 100,
        spread: 120,
        startVelocity: 50,
        decay: 0.9,
        gravity: 0.8,
        origin: {
          x: Math.random(),
          y: Math.random() * 0.5,
        },
      });
    } else {
      console.warn("Confetti instance not available.");
    }
  }, []);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLottie(false); 
    }, 40);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showLottie) {
      fireConfetti(); // Initial burst of confetti
      const interval = setInterval(() => {
        fireConfetti(); // Continue with fireworks every 1.5 seconds
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [showLottie, fireConfetti]);

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#121212",
        color: "white",
        zIndex: 9999,
      }}
    >
      {showLottie ? (
        <DotLottieReact
          src="https://lottie.host/0c127883-c804-4e42-ba3f-71523b916a13/1Qdo2QhgWr.lottie"
          loop
          autoplay
          style={{ width: "300px", height: "300px" }}
        />
      ) : (
        <>

          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textShadow: "0px 0px 20px rgb(12, 44, 131)",
              marginBottom: "20px",
              animation: "pulse 1.5s infinite",
            }}
          >
           Congratulations!
          </Typography>
         
          <Typography variant="h5">
            <TextToSpeech textData="You have registered successfully We will contact you shortly via e-mail." />
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ByeBye;
