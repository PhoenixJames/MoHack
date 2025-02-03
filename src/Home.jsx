import React from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientBackground from "./GradientBackground";

const Home = () => {
  const navigate = useNavigate();

  return (
    <GradientBackground>
      <Typography
        variant="h2"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Welcome
      </Typography>

      <Typography variant="h6" sx={{ marginBottom: "40px", opacity: 0.9 }}>
        AI-powered Voice & Face Recognition Hackathon Project
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate("/dictaphone")}
        sx={{
          backgroundColor: "#2C2C54", // Deep Purple
          color: "#fff",
          fontSize: "1.2rem",
          padding: "12px 30px",
          borderRadius: "8px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#1B1B3A",
          },
        }}
      >
        Show
      </Button>
    </GradientBackground>
  );
};

export default Home;
