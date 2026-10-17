"use client";

import { useState } from "react";

export default function TestimonialsCarousel({ testimonials, styles }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const activeTestimonial = testimonials[activeIndex];
  const hasMultipleTestimonials = testimonials.length > 1;

  const move = (step) => {
    if (!hasMultipleTestimonials) return;

    setDirection(step > 0 ? "next" : "previous");
    setActiveIndex(
      (current) => (current + step + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className={styles.testimonialCard} aria-roledescription="carousel">
      <article
        key={activeTestimonial.id}
        className={styles.testimonialContent}
        data-direction={direction}
        aria-live="polite"
      >
        <span className={styles.testimonialPreviewLabel}>
          {activeTestimonial.eyebrow}
        </span>
        <span className={styles.testimonialQuoteMark} aria-hidden="true">
          {"\u201c"}
        </span>
        <blockquote>{activeTestimonial.quote}</blockquote>
        <footer className={styles.testimonialAuthor}>
          <strong>{activeTestimonial.author}</strong>
          <span>{activeTestimonial.role}</span>
        </footer>
      </article>

      <div className={styles.testimonialControls}>
        <div className={styles.testimonialCount}>
          <strong>{String(activeIndex + 1).padStart(2, "0")}</strong>
          <span>/</span>
          <span>{String(testimonials.length).padStart(2, "0")}</span>
        </div>

        <div className={styles.testimonialArrows}>
          <button
            type="button"
            onClick={() => move(-1)}
            disabled={!hasMultipleTestimonials}
            aria-label="Previous testimonial"
          >
            {"\u2190"}
          </button>
          <button
            type="button"
            onClick={() => move(1)}
            disabled={!hasMultipleTestimonials}
            aria-label="Next testimonial"
          >
            {"\u2192"}
          </button>
        </div>
      </div>
    </div>
  );
}
