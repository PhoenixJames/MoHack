import React, { useEffect, useState } from "react";
import { Typography, Fab } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientBackground from "./GradientBackground";
import NavigationIcon from "@mui/icons-material/Navigation";
import "./Home.css"; // Import custom styles
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import TextToSpeech from "./TextToSpeech";

const Home = () => {
  const navigate = useNavigate();
  const text = "How may I help you?\nPlease click on 'Navigate' button";

  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      setTypingDone(true);
    }
  }, [index, text]);

  return (
    <div >

    
        <GradientBackground>
        <div className="lottie-background">
        <DotLottieReact
          src="https://lottie.host/9ebc6006-2211-4cfd-8549-40477977afb7/VileGXqN7s.lottie"
          loop
          autoplay
        />
      </div>
          <Typography variant="h2" className="fade-in">
              <TextToSpeech textData="Welcome To Shwe Bank" />
          </Typography>

          <Typography sx={{ mt: 5 }} variant="h6" className={`typewriter ${typingDone ? "done" : ""}`}>
            {displayedText}
          </Typography>

          <Fab sx={{ mt: 7 }} variant="extended" onClick={() => navigate("/dictaphone")}>
            <NavigationIcon sx={{ mr: 1 }} />
            Navigate
          </Fab>
       
        </GradientBackground>
    
    </div>
  );
};

export default Home;
