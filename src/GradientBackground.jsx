import React from "react";

const GradientBackground = ({ children }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(135deg, #0F172A, #1E293B, #334155)", // Gradient background
        color: "#fff",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 0,
      }}
    >
      {children}
    </div>
  );
};

export default GradientBackground;
