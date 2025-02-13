import React, { useState } from "react";
import { useSpeech } from "react-text-to-speech";

export default function TextToSpeech({ textData }) {
  const [text, setText] = useState(textData);

  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text,
    lang: "en-GB",
    voiceURI: "Google UK English Female",
    autoPlay: true,
    highlightText: true,
    highlightMode: "word",
    highlightProps: {
      style: {
        color: "rgba(255, 255, 255, 0.8)", 
        backgroundColor: "rgba(0, 0, 0, 0.5)", 
        padding: "2px 4px",
        borderRadius: "4px",
      },
    },
  });


  

  
  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Text />
    </div>
  );
}
