import Navbar from "./components/Navbar";
import InteractiveMockup from "./components/InteractiveMockup";
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
      </main>
    </div>
  );
}
