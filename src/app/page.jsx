import ContactButton from "@/components/ContactButton";
import ClientsCarousel from "@/components/ClientsCarousel";
import ServicesShowcase from "@/components/ServicesShowcase";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
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
    visualSteps: ["Attention","Connection","Community"],
    href: "/services#social-media-management",
  },
  {
    number: "02",
    title: "Web Design & Development",
    description:
      "High-performance websites designed to look exceptional and convert visitors.",
    points: ["UX Direction", "Custom Design", "Development", "Conversion"],
    visualLabel: "Digital Experience",
    visualSteps: ["First click","Exploration","Action"],
    href: "/services#web-development",
  },
  {
    number: "03",
    title: "SEO",
    description:
      "Search strategies that put your brand in front of the people already looking for it.",
    points: ["Technical SEO", "On-Page", "Content Mapping", "Visibility"],
    visualLabel: "Search Presence",
    visualSteps: ["Search","Discovery","Your brand"],
    href: "/services#seo",
  },
  {
    number: "04",
    title: "Content Creation",
    description:
      "Visuals, video and creative campaigns built for modern digital platforms.",
    points: ["Visual Direction", "Video", "Campaign Assets", "Creative Systems"],
    visualLabel: "Creative Production",
    visualSteps: ["Idea","Creation","Impact"],
    href: "/services#content-creation",
  },
  {
    number: "05",
    title: "AI & Automation",
    description:
      "Intelligent systems that help brands work faster, smarter and more efficiently.",
    points: ["Automation Flows", "AI Support", "Workflows", "Efficiency"],
    visualLabel: "Smart Workflows",
    visualSteps: ["Trigger","Process","Done"],
    href: "/services#ai-automation",
  },
];

// Add verified project, brand, and experience figures here when they are available.
const aboutStats = [];

const processSteps = [
  {
    number: "01",
    title: "Discover",
    description: "We understand your brand, audience and goals.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "We create a clear digital and creative direction.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Our team turns the strategy into content, websites and campaigns.",
  },
  {
    number: "04",
    title: "Grow",
    description: "We analyze, optimize and continuously improve.",
  },
];

const testimonials = [
  {
    "id": "butik-irna",
    "eyebrow": "E-commerce Development",
    "quote": "With over 1,000 products, making our collection easy to browse was a priority. ASI built an online store that feels organized, reflects our brand, and makes it simple for customers to find what they’re looking for.",
    "author": "Butik Irna",
    "role": "E-commerce"
  },
  {
    "id": "konak-ramonda",
    "eyebrow": "Social Media Management",
    "quote": "We wanted our social media to reflect the atmosphere of our place. ASI brought a more consistent look to our profile while keeping the warmth and character that make Ramonda special.",
    "author": "Konak Ramonda",
    "role": "Social Media"
  },
  {
    "id": "bebeco",
    "eyebrow": "Social Media Management",
    "quote": "From baby clothes to everyday essentials, we wanted to show parents what they could find in our store. ASI helped us present our products clearly and gave our profile a warm, consistent feel that suits bebeco.",
    "author": "bebeco",
    "role": "Social Media"
  }
];
export default function Home() {
  return (
    <div id="top" className={styles.page}>
      <Navbar />
      <main>
        <HeroSection />

        <section
          id="work"
          className={styles.trustedSection}
          aria-labelledby="trusted-heading"
        >
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

          <ClientsCarousel clients={selectedCollaborations} styles={styles} />
        </section>

        <section
          id="services"
          className={styles.servicesSection}
          aria-labelledby="services-heading"
        >
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

        <section
          id="about"
          className={styles.aboutSection}
          aria-labelledby="about-heading"
        >
          <div className={styles.aboutGrid}>
            <div className={styles.aboutContent}>
              <span className={styles.sectionEyebrow}>About ASI</span>
              <h2 id="about-heading" className={styles.aboutTitle}>
                More than an agency. <span>A creative partner.</span>
              </h2>
              <p className={styles.aboutCopy}>
                We combine creativity, technology and strategy to help ambitious
                brands build a stronger presence in the digital world.
              </p>

              {aboutStats.length > 0 && (
                <div className={styles.aboutStats}>
                  {aboutStats.map((stat) => (
                    <div key={stat.label} className={styles.aboutStat}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.aboutVisual} aria-hidden="true">
              <div className={styles.aboutVisualTopline}>
                <span>ASI / Creative direction</span>
                <span>Selected fragments / 01</span>
              </div>

              <div className={styles.aboutScene}>
                <div className={styles.brandCanvas}>

                  <div className={styles.canvasPoster}>
                    <span>Creative partner</span>
                    <strong>
                      Make it
                      <br />
                      matter.
                    </strong>
                    <i />
                  </div>

                  <div className={styles.canvasFrame}>
                    <span>Campaign / 01</span>
                    <div className={styles.canvasImage}>
                      <span />
                    </div>
                  </div>

                  <div className={styles.canvasInterface}>
                    <span>Digital systems</span>
                    <i />
                    <i />
                    <i />
                  </div>

                  <p className={styles.canvasNote}>
                    Ideas become systems.
                    <br />
                    Systems become impact.
                  </p>
                  <span className={styles.canvasMarker}>+</span>
                </div>
              </div>

              <div className={styles.aboutVisualLegend}>
                <span>Strategy</span>
                <span>Creativity</span>
                <span>Technology</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.processSection} aria-labelledby="process-heading">
          <div className={styles.processIntro}>
            <div>
              <span className={styles.sectionEyebrow}>Our Process</span>
              <h2 id="process-heading" className={styles.processTitle}>
                From idea to impact.
              </h2>
            </div>
            <p className={styles.processCopy}>
              A focused four-step collaboration designed to turn clear thinking into
              meaningful, measurable digital work.
            </p>
          </div>

          <ProcessTimeline steps={processSteps} styles={styles} />
        </section>

        <section
          id="testimonials"
          className={styles.testimonialsSection}
          aria-labelledby="testimonials-heading"
        >
          <div className={styles.testimonialsIntro}>
            <span className={styles.sectionEyebrow}>Client Perspective</span>
            <h2 id="testimonials-heading" className={styles.testimonialsTitle}>
              Don&apos;t take our word for it.
            </h2>
          </div>

          <TestimonialsCarousel testimonials={testimonials} styles={styles} />
        </section>

        <section id="contact" className={styles.finalCta} aria-labelledby="cta-heading">
          <div className={styles.finalCtaInner}>
            <span className={styles.finalCtaEyebrow}>Have a project in mind?</span>
            <h2 id="cta-heading" className={styles.finalCtaTitle}>
              Your next big project starts here.
            </h2>
            <p className={styles.finalCtaCopy}>
              Let&apos;s build something worth remembering.
            </p>
            <div className={styles.finalCtaActions}>
              <ContactButton className={styles.finalCtaButton}>
                Start a Project
                <span aria-hidden="true">{"\u2192"}</span>
              </ContactButton>
              <a href="mailto:asi.solutions45@gmail.com" className={styles.finalCtaEmail}>
                Send an email
              </a>
            </div>
            <span className={styles.finalCtaMonogram} aria-hidden="true">
              ASI
            </span>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerBrand}>
            <a href="#top" aria-label="Back to top">ASI</a>
            <p>
              Creative agency for brands
              <br />
              ready to stand out.
            </p>
          </div>

          <nav className={styles.footerLinks} aria-label="Footer navigation">
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>

          <div className={styles.footerSocials} aria-label="Social profiles coming soon">
            <span>Instagram</span>
            <span>LinkedIn</span>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <span>{"\u00a9"} 2026 ASI</span>
          <p>Let&apos;s create something remarkable.</p>
        </div>
      </footer>
    </div>
  );
}
