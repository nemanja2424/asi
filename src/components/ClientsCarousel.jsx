"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function ClientsCarousel({ clients, styles }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const goToClient = (index) => {
    const nextIndex = Math.max(0, Math.min(index, clients.length - 1));
    const card = trackRef.current?.children[nextIndex];

    if (!card) return;

    trackRef.current.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveIndex(nextIndex);
  };

  const updateActiveClient = () => {
    const track = trackRef.current;

    if (!track) return;

    const cards = Array.from(track.children);
    const closestIndex = cards.reduce((closest, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      const closestDistance = Math.abs(
        cards[closest].offsetLeft - track.scrollLeft,
      );

      return currentDistance < closestDistance ? index : closest;
    }, 0);

    setActiveIndex(closestIndex);
  };

  return (
    <div className={styles.clientsCarousel} aria-roledescription="carousel">
      <div
        ref={trackRef}
        className={styles.clientsTrack}
        onScroll={updateActiveClient}
        aria-label="Selected client collaborations"
      >
        {clients.map((client, index) => (
          <a
            key={client.name}
            href={client.href}
            target="_blank"
            rel="noreferrer"
            className={styles.clientCard}
            style={{ "--client-index": `"0${index + 1}"` }}
            aria-label={`${client.name}, ${client.type}`}
          >
            <div className={styles.clientBody}>
              <div className={styles.clientMeta}>
                <span className={styles.clientType}>{client.type}</span>
                <h3 className={styles.clientName}>{client.name}</h3>
              </div>
              <p className={styles.clientSummary}>{client.summary}</p>
            </div>

            <div className={styles.clientAside}>
              <div
                className={styles.clientLogoRing}
                style={{
                  "--client-logo-width": `${client.width}%`,
                  "--client-logo-height": `${client.height}%`,
                }}
              >
                {client.logo ? (
                  <Image
                    src={client.logo}
                    alt={`${client.name} logo`}
                    width={200}
                    height={200}
                    className={styles.clientLogo}
                  />
                ) : (
                  <span className={styles.clientInitials}>{client.initials}</span>
                )}
              </div>
              <span className={styles.clientBadge}>{client.type}</span>
            </div>
          </a>
        ))}
      </div>

      <div className={styles.carouselFooter}>
        <div className={styles.carouselPosition} aria-live="polite">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <div className={styles.carouselProgress} aria-hidden="true">
            <span
              style={{ "--carousel-progress": (activeIndex + 1) / clients.length }}
            />
          </div>
          <span>{String(clients.length).padStart(2, "0")}</span>
        </div>

        <div className={styles.carouselControls}>
          <button
            type="button"
            onClick={() => goToClient(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous client"
          >
            {"\u2190"}
          </button>
          <button
            type="button"
            onClick={() => goToClient(activeIndex + 1)}
            disabled={activeIndex === clients.length - 1}
            aria-label="Next client"
          >
            {"\u2192"}
          </button>
        </div>
      </div>
    </div>
  );
}
