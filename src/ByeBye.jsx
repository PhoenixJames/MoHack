import React, { useEffect, useRef, useState, useCallback } from "react";
import { Typography, Box } from "@mui/material";
import TextToSpeech from "./TextToSpeech";

const ByeBye = () => {
 



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
    
    </Box>
  );
};

export default ByeBye;
