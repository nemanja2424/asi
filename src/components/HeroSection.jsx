import ContactButton from "./ContactButton";
import Link from "next/link";
import AsiEcosystem from "./AsiEcosystem";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.copy}>
        <span className={styles.eyebrow}>ASI Solutions / For ambitious US businesses</span>
        <h1 id="hero-heading" className={styles.title}>
          <span>Web design, social media</span>{" "}
          <span>and AI automation</span>{" "}
          <span className={styles.accent}>for growing brands.</span>
        </h1>
        <p className={styles.description}>
          ASI Solutions builds custom websites, manages social media, creates
          content, and connects business workflows for brands reaching US customers.
        </p>
        <div className={styles.actions}>
          <ContactButton className={styles.primary}>
            Start a project <span aria-hidden="true">→</span>
          </ContactButton>
          <a href="#work" className={styles.secondary}>View our work</a>
        </div>
        <ul className={styles.services} aria-label="Our connected services">
          <li><Link href="/services/web-development">Web development</Link></li>
          <li><Link href="/services/social-media-management">Social media</Link></li>
          <li><Link href="/services/ai-automation">AI automation</Link></li>
          <li><Link href="/services/content-creation">Content creation</Link></li>
        </ul>
      </div>
      <div className={styles.visual}><AsiEcosystem /></div>
    </section>
  );
}
