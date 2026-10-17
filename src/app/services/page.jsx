"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import styles from "./page.module.css";

const services = [
  {
    id: "content-creation",
    label: "Content creation",
    mobileLabel: "Content",
    eyebrow: "Visual storytelling systems",
    title: "Content that feels editorial, premium, and built to convert.",
    description:
      "From campaign concepts to short-form execution, we build repeatable content formats that keep your brand polished while still feeling native to the platform.",
    highlights: ["Creative direction", "Video concepts", "Shoot planning"],
    stats: [
      { value: "12+", label: "Monthly deliverables" },
      { value: "4D", label: "Production flow" },
      { value: "UGC+", label: "Native ad style" },
    ],
    cards: [
      { title: "Campaign hook", text: "Concept-first openings designed to stop the scroll fast." },
      { title: "Shot map", text: "Clean pre-production structure for smooth filming days." },
      { title: "Edit rhythm", text: "Pacing, captions, and transitions tuned for retention." },
    ],
    timeline: ["Brief alignment", "Creative routes", "Production", "Publishing pack"],
  },
  {
    id: "social-media-management",
    aliases: ["social-media-managing"],
    label: "Social media management",
    mobileLabel: "Social",
    eyebrow: "Always-on profile growth",
    title: "Daily management that keeps the brand active without feeling robotic.",
    description:
      "We handle planning, publishing, reporting, and community touchpoints so your channels stay sharp, responsive, and consistent across every week.",
    highlights: ["Content calendars", "Posting cadence", "Community care"],
    stats: [
      { value: "7x", label: "Weekly coverage" },
      { value: "24h", label: "Response rhythm" },
      { value: "CRM", label: "Lead handoff" },
    ],
    cards: [
      { title: "Weekly board", text: "Clear scheduling with priorities, launches, and backups." },
      { title: "Community loop", text: "Replies, sentiment tracking, and escalation signals." },
      { title: "Performance pulse", text: "Fast insight snapshots to guide the next week." },
    ],
    timeline: ["Planning", "Scheduling", "Engagement", "Optimization"],
  },
  {
    id: "web-development",
    label: "Web development",
    mobileLabel: "Web",
    eyebrow: "Elegant digital experiences",
    title: "Fast websites and landing pages with a premium front-end finish.",
    description:
      "We design and develop web experiences that feel refined, move smoothly, and guide visitors toward clear actions without clutter or friction.",
    highlights: ["Next.js builds", "Landing pages", "Conversion UX"],
    stats: [
      { value: "90+", label: "Perf targets" },
      { value: "A11y", label: "Usable flows" },
      { value: "CMS", label: "Easy updates" },
    ],
    cards: [
      { title: "Hero systems", text: "Distinct first impressions with layered motion and clarity." },
      { title: "Component polish", text: "Reusable UI blocks that scale cleanly across pages." },
      { title: "Launch ready", text: "Responsive QA, deployment, and post-launch refinement." },
    ],
    timeline: ["Discovery", "Wireframes", "Build", "Launch"],
  },
  // {
  //   id: "seo",
  //   label: "SEO",
  //   mobileLabel: "SEO",
  //   eyebrow: "Search visibility with structure",
  //   title: "SEO foundations that support growth long after the campaign ends.",
  //   description:
  //     "We connect technical cleanup, content structure, and intent-based pages so your brand is easier to discover and stronger in organic search.",
  //   highlights: ["On-page strategy", "Technical fixes", "Search intent mapping"],
  //   stats: [
  //     { value: "SERP", label: "Visibility wins" },
  //     { value: "Core", label: "Web vitals" },
  //     { value: "3x", label: "Content clusters" },
  //   ],
  //   cards: [
  //     { title: "Audit pass", text: "Prioritized fixes for indexing, structure, and speed." },
  //     { title: "Keyword map", text: "Intent-led planning tied to real service and offer pages." },
  //     { title: "Growth lane", text: "Content opportunities grouped into scalable topic clusters." },
  //   ],
  //   timeline: ["Audit", "Mapping", "Implementation", "Monitoring"],
  // },
  {
    id: "ai-automation",
    label: "AI & automation",
    mobileLabel: "AI",
    eyebrow: "Smarter operational systems",
    title: "Automation that gives your team more time for valuable work.",
    description:
      "We connect practical AI tools and tailored workflows to reduce repetitive tasks, accelerate delivery, and keep your operations moving with less friction.",
    highlights: ["Workflow design", "AI assistants", "System integration"],
    stats: [
      { value: "24/7", label: "Automated support" },
      { value: "2x", label: "Faster workflows" },
      { value: "API", label: "Connected tools" },
    ],
    cards: [
      { title: "Process map", text: "A clear audit of repeatable work and automation opportunities." },
      { title: "Smart workflow", text: "Connected tools that move information without manual handoffs." },
      { title: "Human control", text: "Useful AI systems with clear review points and team ownership." },
    ],
    timeline: ["Audit", "Prototype", "Integration", "Refinement"],
  },
];

const findServiceIndex = (hash) => {
  const serviceId = decodeURIComponent(hash.replace(/^#/, "")).toLowerCase();

  return services.findIndex(
    (service) =>
      service.id === serviceId || service.aliases?.includes(serviceId),
  );
};

export default function ServicesPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const activeService = services[activeIndex];

  useEffect(() => {
    const selectFromHash = () => {
      const nextIndex = findServiceIndex(window.location.hash);

      if (nextIndex < 0) return;

      setActiveIndex((currentIndex) => {
        if (currentIndex !== nextIndex) {
          setDirection(nextIndex > currentIndex ? "right" : "left");
        }

        return nextIndex;
      });
    };

    selectFromHash();
    window.addEventListener("hashchange", selectFromHash);
    window.addEventListener("popstate", selectFromHash);

    return () => {
      window.removeEventListener("hashchange", selectFromHash);
      window.removeEventListener("popstate", selectFromHash);
    };
  }, []);

  const handleSelect = (index) => {
    window.history.pushState(null, "", `#${services[index].id}`);

    if (index === activeIndex) {
      return;
    }

    setDirection(index > activeIndex ? "right" : "left");
    setActiveIndex(index);
  };

  return (
    <div className={styles.page}>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroTop}>
            <div>
              <span className={styles.eyebrow}>Services</span>
              <h1 className={styles.title}>
                Crafted systems for brands that want more than a basic online presence.
              </h1>
            </div>

            <p className={styles.intro}>
              Each service below has its own rhythm, layout, and motion so you can
              clearly feel the left-right slide transition and animated indicator in action.
            </p>
          </div>

          <div className={styles.switcherShell}>
            <div
              className={styles.switcher}
              style={{ "--active-index": activeIndex, "--service-count": services.length }}
            >
              <span className={styles.indicator} aria-hidden="true" />

              {services.map((service, index) => (
                <button
                  key={service.id}
                  type="button"
                  className={`${styles.switcherItem} ${
                    index === activeIndex ? styles.switcherItemActive : ""
                  }`}
                  onClick={() => handleSelect(index)}
                >
                  <span className={styles.desktopLabel}>{service.label}</span>
                  <span className={styles.mobileLabel}>{service.mobileLabel}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.slideViewport}>
            <article
              key={activeService.id}
              className={styles.slide}
              data-direction={direction}
            >
              <div className={styles.slideContent}>
                <div className={styles.copyColumn}>
                  <span className={styles.slideEyebrow}>{activeService.eyebrow}</span>
                  <h2 className={styles.slideTitle}>{activeService.title}</h2>
                  <p className={styles.slideDescription}>{activeService.description}</p>

                  <div className={styles.highlightRow}>
                    {activeService.highlights.map((item) => (
                      <span key={item} className={styles.highlightPill}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className={styles.statGrid}>
                    {activeService.stats.map((stat) => (
                      <div key={stat.label} className={styles.statCard}>
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.visualColumn}>
                  <div className={styles.visualPanel}>
                    <span className={styles.panelLabel}>Service preview</span>

                    <div className={styles.cardGrid}>
                      {activeService.cards.map((card, index) => (
                        <div
                          key={card.title}
                          className={styles.featureCard}
                          style={{ "--card-delay": `${index * 90}ms` }}
                        >
                          <h3>{card.title}</h3>
                          <p>{card.text}</p>
                        </div>
                      ))}
                    </div>

                    <div className={styles.timeline}>
                      {activeService.timeline.map((step, index) => (
                        <div
                          key={step}
                          className={styles.timelineStep}
                          style={{ "--step-delay": `${index * 110}ms` }}
                        >
                          <span>{`0${index + 1}`}</span>
                          <p>{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
