"use client";

import { useState } from "react";

export default function ProcessTimeline({ steps, styles }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = steps[activeIndex];

  return (
    <div className={styles.processTimeline}>
      <div className={styles.processTrack}>
        <span className={styles.processLine} aria-hidden="true" />

        {steps.map((step, index) => {
          const isActive = activeIndex === index;

          return (
            <button
              key={step.number}
              type="button"
              className={`${styles.processStep} ${
                isActive ? styles.processStepActive : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-pressed={isActive}
            >
              <span className={styles.processNumber}>{step.number}</span>
              <span className={styles.processDot} aria-hidden="true" />
              <strong>{step.title}</strong>
              <span className={styles.processDescription}>{step.description}</span>
            </button>
          );
        })}
      </div>

      <div key={activeStep.number} className={styles.processMobileDetail}>
        <span>{activeStep.number}</span>
        <p>{activeStep.description}</p>
      </div>
    </div>
  );
}
