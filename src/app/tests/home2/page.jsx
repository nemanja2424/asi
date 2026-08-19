import Navbar from "./components/Navbar";
import InteractiveMockup from "../components/InteractiveMockup";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.hero}>
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
                →
              </span>
            </a>
          </section>

            <div className={styles.mockupWrap}>
              <InteractiveMockup />
            </div>
        </div>
      </main>
    </div>
  );
}
