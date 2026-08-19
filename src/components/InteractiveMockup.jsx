"use client";

import { useState } from "react";

export default function InteractiveMockup() {
  const [style, setStyle] = useState({
    transform:
      "perspective(1400px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)",
  });

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = (((y / rect.height) - 0.5) * -1) * 10;
    const translateX = ((x / rect.width) - 0.5) * 10;
    const translateY = ((y / rect.height) - 0.5) * 8;

    setStyle({
      transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0px)`,
    });
  };

  const resetStyle = () => {
    setStyle({
      transform:
        "perspective(1400px) rotateX(0deg) rotateY(0deg) translate3d(0px, 0px, 0px)",
    });
  };

  return (
    <div
      className="interactive-mockup"
      onMouseMove={handleMove}
      onMouseLeave={resetStyle}
      onBlur={resetStyle}
      tabIndex={0}
      style={style}
    >
      <div className="mockup-topbar">
        <span />
        <span />
        <span />
      </div>

      <div className="mockup-frame">
        <div className="mockup-kicker">Featured Case</div>
        <h3>Editorial brand system for social and web launch.</h3>
        <div className="mockup-chart" />
        <div className="mockup-grid">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}
