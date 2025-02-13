import React, { useEffect, useState } from "react";
import { useSpeech, useVoices } from "react-text-to-speech";

export default function TextToSpeech({ textData }) {
  const [text, setText] = useState(textData)
  const { Text, speechStatus, start, pause, stop } = useSpeech({
    text: text,
    lang: "en-GB",
    voiceURI: "Google UK English Female",
    autoPlay: true,
    highlightText: true,
    showOnlyHighlightedText: false,
    highlightMode: "word"
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", rowGap: "1rem" }}>
      <Text />
    </div>
  );
}
