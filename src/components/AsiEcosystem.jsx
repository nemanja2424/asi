"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./AsiEcosystem.module.css";

const modules = [
  { name: "Web", number: "01", flow: "visitor → lead", detail: "Websites designed for conversion.", position: "web", path: "M 100 79 V 113 Q 100 125 112 125 H 182 Q 220 125 220 163" },
  { name: "Social", number: "02", flow: "reach → attention", detail: "Content and distribution built for attention.", position: "social", path: "M 340 63 V 106 Q 340 118 328 118 H 258 Q 220 118 220 163" },
  { name: "AI", number: "03", flow: "lead → automated workflow", detail: "Automated workflows that remove repetitive work.", position: "ai", path: "M 220 163 V 211 Q 220 223 208 223 H 112 Q 100 223 100 235 V 275" },
  { name: "Growth", number: "04", flow: "attention → conversion", detail: "Connected system → performance.", position: "growth", path: "M 220 163 V 202 Q 220 214 232 214 H 328 Q 340 214 340 226 V 275" },
];

export default function AsiEcosystem() {
  const [cycle, setCycle] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [focused, setFocused] = useState(null);
  const [paused, setPaused] = useState(false);
  const panel = useRef(null);
  const active = hovered ?? focused ?? cycle;
  const interacting = hovered !== null || focused !== null;

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = true;
    let timer;
    function sync() {
      window.clearInterval(timer);
      if (!motion.matches && !document.hidden && visible && !interacting && !paused) {
        timer = window.setInterval(() => setCycle((value) => (value + 1) % modules.length), 2500);
      }
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(panel.current);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, [interacting, paused]);

  return (
    <section ref={panel} className={styles.panel} aria-label="ASI Ecosystem: one connected digital system" data-paused={paused || interacting}>
      <header className={styles.header}>
        <span>ASI <span className={styles.slash}>/</span> Ecosystem</span>
        <span className={styles.connected}><i aria-hidden="true" /> Connected</span>
      </header>

      <div className={styles.network}>
        <svg className={styles.connections} viewBox="0 0 440 340" preserveAspectRatio="none" aria-hidden="true">
          {modules.map((module, index) => (
            <g key={module.name} className={active === index ? styles.activeLine : undefined}>
              <path className={styles.line} d={module.path} pathLength="100" />
              <path className={styles.signal} d={module.path} pathLength="100" />
            </g>
          ))}
        </svg>

        <div className={styles.core}>
          <span className={styles.orbit} aria-hidden="true" />
          <strong>ASI</strong>
          <span>System core</span>
        </div>

        {modules.map((module, index) => (
          <button
            type="button"
            key={module.name}
            className={`${styles.node} ${styles[module.position]}`}
            data-active={active === index}
            aria-pressed={active === index}
            aria-label={`${module.name}: ${module.flow}. ${module.detail}`}
            onPointerEnter={(event) => { if (event.pointerType !== "touch") setHovered(index); }}
            onPointerLeave={() => setHovered(null)}
            onFocus={() => setFocused(index)}
            onBlur={() => setFocused(null)}
            onClick={() => setCycle(index)}
          >
            <span className={styles.nodeTitle}><span>{module.number}</span> {module.name}<i aria-hidden="true" /></span>
            <span className={styles.flow}>{module.flow}</span>
          </button>
        ))}
        <span className={styles.inputLabel} aria-hidden="true">Input / connection / output</span>
      </div>

      <div className={styles.context}>
        <span className={styles.counter}>{modules[active].number} <span>/ 04</span></span>
        <p key={active}>{modules[active].detail}</p>
        <button className={styles.playback} type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume ecosystem animation" : "Pause ecosystem animation"} aria-pressed={paused}>
          <svg viewBox="0 0 16 16" aria-hidden="true">{paused ? <path d="M5 3 12 8 5 13Z" /> : <path d="M5 3V13M11 3V13" />}</svg>
        </button>
      </div>

      <footer className={styles.footer}>
        <div><strong>One digital system.</strong><p>Web <span>•</span> Social <span>•</span> Content <span>•</span> Automation</p></div>
        <span className={styles.systemMark} aria-hidden="true">↗</span>
      </footer>
    </section>
  );
}
