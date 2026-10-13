"use client";

import { useState } from "react";
import visualStyles from "./ServicesShowcase.module.css";

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
          >
            <button
              type="button"
              className={styles.serviceTrigger}
              onClick={() => toggleActive(index)}
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
              <div className={styles.servicePanelInner}>
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
                  {service.visualSteps ? (
                    <ol className={visualStyles.steps} aria-label={service.visualLabel}>
                      {service.visualSteps.map((step, stepIndex) => (
                        <li key={step} className={visualStyles.step}>
                          <span className={visualStyles.stepLabel}>{step}</span>
                          {stepIndex < service.visualSteps.length - 1 && (
                            <span className={visualStyles.arrow} aria-hidden="true">
                              {"\u2192"}
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <div className={styles.serviceVisualArt}>
                      <span className={styles.serviceVisualLine} />
                      <span className={styles.serviceVisualLine} />
                      <span className={styles.serviceVisualLine} />
                    </div>
                  )}
                </div>
                <a href={service.href} className={styles.serviceMore}>
                  Explore service
                  <span aria-hidden="true">{"\u2192"}</span>
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
