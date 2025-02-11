import React, { useEffect } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GradientBackground from "./GradientBackground";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./Dictaphone.css";

const Service = () => {
    const navigate = useNavigate();
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();
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
        const lowerCaseTranscript = transcript.toLowerCase();
        // Navigate when relevant words are detected
        if (lowerCaseTranscript.includes("open") || lowerCaseTranscript.includes("account")) {
            navigate("/information");
        }
    }, [transcript, navigate]);

    if (!browserSupportsSpeechRecognition) {
        return <Typography variant="h6">Browser doesn't support speech recognition.</Typography>;
    }

    return (
        <GradientBackground>
            <div className="overlay-container">
                <Typography variant="h2" className="fade-in">
                    Which service would you like to have?
                </Typography>
            </div>

            <Typography variant="h6" sx={{ mt: 5 }}>
                Microphone: {listening ? "ON" : "OFF"}
            </Typography>

            <Box className="transcription-box" sx={{ mt: 3 }}>
                <DotLottieReact
                    src="https://lottie.host/24315427-b18f-4be9-9ccf-19a02d4a76bb/nR8BxcbI6H.lottie"
                    loop
                    autoplay
                />
                <Typography variant="body1" style={{ marginTop: "-50px", fontSize: "20px" }}>
                    {transcript || "Start speaking..."}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
                <Button variant="contained" onClick={resetTranscript} sx={{ backgroundColor: "transparent", color: "#000" }}>
                    Reset
                </Button>
            </Box>

            <Button onClick={() => navigate("/dictaphone")} className="back-button">
                Back
            </Button>
        </GradientBackground>
    );
};

export default Service;
