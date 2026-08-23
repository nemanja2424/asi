import Image from "next/image";
import ServicesShowcase from "@/components/ServicesShowcase";
import Navbar from "@/components/Navbar";
import InteractiveMockup from "@/components/InteractiveMockup";
import styles from "./page.module.css";

const selectedCollaborations = [
  {
    name: "Moj Termin",
    href: "https://mojtermin.site",
    type: "Website",
    summary:
      "An online booking platform built to make appointment scheduling fast, clear, and accessible for service-based businesses.",
    logo: "/imeges/mt.webp",
    initials: "MT",
    width: 80,
    height: 80,
  },
  {
    name: "Konak Ramonda",
    href: "https://www.instagram.com/konak.ramondasicevo",
    type: "Social Media",
    summary:
      "A hospitality brand with a warm, destination-driven presence shaped for discovery, atmosphere, and visual storytelling.",
    logo: "/imeges/konak.webp",
    initials: "KR",
    width: 100,
    height: 100,
  },
  {
    name: "mrschille_tattoo",
    href: "https://www.instagram.com/mrschille_tattoo",
    type: "Social Media",
    summary:
      "A tattoo artist profile presented with a sharper visual identity, helping the work stand out through consistent social content.",
    logo: "/imeges/tatoo.webp",
    initials: "MT",
    width: 100,
    height: 100,
  },
  {
    name: "bebeco",
    href: "https://www.instagram.com/bebeco.nis",
    type: "Social Media",
    summary:
      "A boutique-focused social presence designed to highlight products, build trust, and keep the brand visually approachable.",
    logo: "/imeges/bebeco.webp",
    initials: "BB",
    width: 100,
    height: 100,
  },
  {
    name: "Butik Irna",
    href: "https://butikirna.com",
    type: "Website",
    summary:
      "A fashion retail brand with a polished digital storefront and a cleaner brand presentation across its customer journey.",
    logo: "/imeges/irna.png",
    initials: "BI",
    width: 72,
    height: 72,
  },
];

const services = [
  {
    number: "01",
    title: "Social Media",
    description:
      "Strategy, content creation and profile management that turns attention into growth.",
    points: ["Strategy", "Content Creation", "Profile Management", "Analytics"],
    visualLabel: "Growth System",
  },
  {
    number: "02",
    title: "Web Design & Development",
    description:
      "High-performance websites designed to look exceptional and convert visitors.",
    points: ["UX Direction", "Custom Design", "Development", "Conversion"],
    visualLabel: "Digital Experience",
  },
  {
    number: "03",
    title: "SEO",
    description:
      "Search strategies that put your brand in front of the people already looking for it.",
    points: ["Technical SEO", "On-Page", "Content Mapping", "Visibility"],
    visualLabel: "Search Presence",
  },
  {
    number: "04",
    title: "Content Creation",
    description:
      "Visuals, video and creative campaigns built for modern digital platforms.",
    points: ["Visual Direction", "Video", "Campaign Assets", "Creative Systems"],
    visualLabel: "Creative Production",
  },
  {
    number: "05",
    title: "AI & Automation",
    description:
      "Intelligent systems that help brands work faster, smarter and more efficiently.",
    points: ["Automation Flows", "AI Support", "Workflows", "Efficiency"],
    visualLabel: "Operational Leverage",
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main>
        <section className={styles.hero}>
          <div className={styles.heroGrid}>
            <section>
              <span className={styles.eyebrow}>Creative Direction for Modern Brands</span>
              <h1 className={styles.title}>
                Premium digital presence for{" "}
                <span className={styles.brandsAccent}>brands</span> with{" "}
                <span className={styles.accent}>clarity</span>
              </h1>
              <p className={styles.description}>
                ASI builds social-first brands through content production, profile
                management, websites, SEO, and conversion-focused creative systems.
              </p>
              <a href="#work" className={styles.heroCta}>
                View Our Work
                <span className={styles.heroCtaArrow} aria-hidden="true">
                  {"->"}
                </span>
              </a>
            </section>

            <aside className={styles.heroPanel}>
              <span className={styles.panelLabel}>Agency Snapshot</span>
              <h2 className={styles.panelTitle}>Elegant execution without the noise.</h2>
              <p className={styles.panelCopy}>
                The interface direction is built around a restrained black and gold
                palette, refined glass surfaces, and editorial spacing that feels
                premium instead of flashy.
              </p>

              <div className={styles.panelMetrics}>
                <div className={styles.metric}>
                  <span className={styles.metricValue}>Social</span>
                  <span className={styles.metricLabel}>Content & management</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricValue}>Web</span>
                  <span className={styles.metricLabel}>Websites & landing pages</span>
                </div>
                <div className={styles.metric}>
                  <span className={styles.metricValue}>Growth</span>
                  <span className={styles.metricLabel}>SEO & brand positioning</span>
                </div>
              </div>

              <div className={styles.mockupWrap}>
                <InteractiveMockup />
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.trustedSection} aria-labelledby="trusted-heading">
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionEyebrow}>Selected Collaborations</span>
              <h2 id="trusted-heading" className={styles.trustedTitle}>
                Trusted by brands that aim higher.
              </h2>
            </div>

            <p className={styles.trustedCopy}>
              A curated look at brands we have supported through web presence,
              social media execution, and digital brand refinement.
            </p>
          </div>

          <div className={styles.clientsGrid}>
            {selectedCollaborations.map((client) => (
              <a
                key={client.name}
                href={client.href}
                target="_blank"
                rel="noreferrer"
                className={styles.clientCard}
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
        </section>

        <section className={styles.servicesSection} aria-labelledby="services-heading">
          <div className={styles.sectionIntro}>
            <div>
              <span className={styles.sectionEyebrow}>What We Do</span>
              <h2 id="services-heading" className={styles.servicesTitle}>
                Creative and technical systems built for modern brand growth.
              </h2>
            </div>

            <p className={styles.servicesCopy}>
              We combine strategy, content, design, and performance into a tighter
              digital presence that feels elevated and works hard behind the scenes.
            </p>
          </div>

          <ServicesShowcase services={services} styles={styles} />
        </section>
      </main>
    </div>
  );
}
