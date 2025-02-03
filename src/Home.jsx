import React, { useEffect, useState } from "react";
import { Typography, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientBackground from "./GradientBackground";
import NavigationIcon from "@mui/icons-material/Navigation";
import "./Home.css"; // Import custom styles

const Home = () => {
  const navigate = useNavigate();
  const text = "AI-powered Voice & Face Recognition Hackathon Project";
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  // Typewriter Effect
  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100); // Adjust speed here
      return () => clearTimeout(timeout);
    } else {
      setTypingDone(true); // Mark typing as done
    }
  }, [index, text]);

  return (
    <GradientBackground>
      {/* Welcome Text with Fade-in Animation */}
      <Typography variant="h2" className="fade-in">
        Welcome
      </Typography>

      {/* Typewriter Effect */}
      <Typography  sx={{mt:5}} variant="h6" className={`typewriter ${typingDone ? "done" : ""}`}>
        {displayedText}
      </Typography>

      <Fab sx={{mt:7}} variant="extended" onClick={() => navigate("/dictaphone")}>
        <NavigationIcon sx={{ mr: 1 }} />
        Navigate
      </Fab>
    </GradientBackground>
  );
};

export default Home;

 