import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { CanvasManager, Ellipse, Line, setColor } from "https://cdn.jsdelivr.net/gh/marcoscenteno89/util/src/js/canvas.js";

const CanvasSketch = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas;

    const sketch = (p) => {
      p.setup = () => {
        // Set canvas width and height explicitly (example: 800x600)
        const canvasWidth = 800;  // Customize width
        const canvasHeight = 600; // Customize height
        const createdCanvas = p.createCanvas(canvasWidth, canvasHeight).parent(canvasRef.current);
        canvas = new CanvasManager(p5, p, canvasRef.current);

        // Set canvas styles for transparency and z-index
        createdCanvas.style("background", "black");
        createdCanvas.style("z-index", "-9999");

        let color = setColor(p, ["#fff"], "#2ee7ff");

        for (let i = 0; i < 20; i++) {
          let mass = p.createVector(1, 1);
          let pos = p.createVector(p.random(10, p.width - 10), p.random(10, p.height - 10));
          let vel = p.createVector(p.random(-1, 1), p.random(-1, 1));
          canvas.objects.push(new Ellipse(canvas, pos, vel, false, mass, color));
        }
      };

      p.draw = () => {
        let limit = p.width / 3;
        p.clear(); // Clear previous frame without background

        for (let outer of canvas.objects) {
          outer.bounceOfBorder();
          let linesConnected = 0;

          for (let inner of canvas.objects) {
            if (outer !== inner) {
              let dist = p5.Vector.dist(outer.pos, inner.pos);
              if (dist < limit && dist > 1) {
                linesConnected++;
                let alpha = p.map(dist, limit, 0, 1);
                outer.color.fill[0].setAlpha(p.map(alpha, 0, 1, 0, 255));
                outer.color.weight = alpha;
                new Line(canvas, outer.pos, inner.pos, false, outer.color);
              }
            }
          }

          let newMass = p.map(linesConnected, 0, canvas.objects.length, 0, 7);
          outer.mass.set(p.createVector(newMass, newMass));
          outer.draw();
        }
      };
    };

    new p5(sketch);

    return () => {
      if (canvas) canvas.remove(); // Cleanup
    };
  }, []);

  return (
    <div
      ref={canvasRef}
      style={{
        width: "800px",  // Ensure the container matches canvas size
        height: "600px", // Set the same height as canvas
      }}
    />
  );
};

export default CanvasSketch;
