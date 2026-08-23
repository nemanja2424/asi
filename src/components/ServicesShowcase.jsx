"use client";

import { useState } from "react";

export default function ServicesShowcase({ services, styles }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleActive = (index) => {
    setActiveIndex((current) => (current === index ? -1 : index));
  };

  return (
    <div className={styles.servicesStack}>
      {services.map((service, index) => {
        const isActive = index === activeIndex;

        return (
          <article
            key={service.number}
            className={`${styles.serviceRow} ${isActive ? styles.serviceRowActive : ""}`}
            onMouseEnter={() => setActiveIndex(index)}
          >
            <button
              type="button"
              className={styles.serviceTrigger}
              onClick={() => toggleActive(index)}
              onFocus={() => setActiveIndex(index)}
              aria-expanded={isActive}
            >
              <span className={styles.serviceTriggerMeta}>
                <span className={styles.serviceNumber}>{service.number}</span>
                <span className={styles.serviceInlineTitle}>{service.title}</span>
              </span>
              <span className={styles.servicePlus} aria-hidden="true">
                +
              </span>
            </button>

            <div className={styles.servicePanel} aria-hidden={!isActive}>
              <div className={styles.servicePanelBody}>
                <div>
                  <h3 className={styles.serviceName}>{service.title}</h3>
                  <p className={styles.serviceDescription}>{service.description}</p>
                </div>

                <ul className={styles.serviceList}>
                  {service.points.map((point) => (
                    <li key={point} className={styles.serviceListItem}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.serviceVisual}>
                <span className={styles.serviceVisualLabel}>{service.visualLabel}</span>
                <div className={styles.serviceVisualArt}>
                  <span className={styles.serviceVisualLine} />
                  <span className={styles.serviceVisualLine} />
                  <span className={styles.serviceVisualLine} />
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
