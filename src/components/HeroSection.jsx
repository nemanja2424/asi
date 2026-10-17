import ContactButton from "./ContactButton";
import AsiEcosystem from "./AsiEcosystem";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.copy}>
        <span className={styles.eyebrow}>Creative systems for modern brands</span>
        <h1 id="hero-heading" className={styles.title}>
          <span>We build digital systems</span>{" "}
          <span>that make brands</span>{" "}
          <span className={styles.accent}>impossible to ignore.</span>
        </h1>
        <p className={styles.description}>
          Websites, content, social media and AI automation — built as one
          connected system for modern brand growth.
        </p>
        <div className={styles.actions}>
          <ContactButton className={styles.primary}>
            Start a project <span aria-hidden="true">→</span>
          </ContactButton>
          <a href="#work" className={styles.secondary}>View our work</a>
        </div>
        <ul className={styles.services} aria-label="Our connected services">
          <li>Web development</li>
          <li>Social media</li>
          <li>AI automation</li>
          <li>Content</li>
        </ul>
      </div>
      <div className={styles.visual}><AsiEcosystem /></div>
    </section>
  );
}
