import React, { useEffect, useRef, useState, useCallback } from "react";
import Confetti from "react-canvas-confetti";
import { Typography, Box } from "@mui/material";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ByeBye = () => {
  const confettiRef = useRef(null);
  const [showLottie, setShowLottie] = useState(true); // State to control what to display

  const getInstance = useCallback((instance) => {
    confettiRef.current = instance;
  }, []);

  useEffect(() => {
    // Show the DotLottie animation for 5 seconds, then switch to confetti and message
    const timer = setTimeout(() => {
      setShowLottie(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const makeFireworks = () => {
      if (confettiRef.current) {
        confettiRef.current({
          particleCount: 150,
          spread: 180,
          startVelocity: 50,
          ticks: 70,
          decay: 0.9,
          gravity: 0.8,
          scalar: 1.2,
          origin: {
            x: Math.random(), // Random x position
            y: Math.random() * 0.5, // Fire from the upper half
          },
        });
      }
    };

    if (!showLottie) {
      // Continuous fireworks animation every second after DotLottie
      const interval = setInterval(() => {
        makeFireworks();
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [showLottie]);

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
          {/* Full-screen Confetti */}
          <Confetti
            refConfetti={getInstance}
            style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh" }}
          />
          {/* Celebration Message */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: "bold",
              textShadow: "0px 0px 20px rgba(255, 215, 0, 1)",
              marginBottom: "20px",
              animation: "pulse 1.5s infinite",
            }}
          >
            🎉 Congratulations! 🎉
          </Typography>
          <Typography variant="h5">You have registered successfully!</Typography>
          <Typography variant="h5">We will contact you shortly via e-mail.</Typography>
        </>
      )}
    </Box>
  );
};

export default ByeBye;
