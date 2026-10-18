import Link from "next/link";
import { services } from "@/lib/services";
import { site } from "@/lib/seo";
import SocialLinks from "./SocialLinks";
import { ArrowIcon } from "./ServiceIcon";
import styles from "./SiteFooter.module.css";

export default function ServiceFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.topline}>
        <span>Creativity meets technology</span>
        <Link href="/#contact">Let&apos;s build something <ArrowIcon diagonal /></Link>
      </div>
      <div className={styles.columns}>
        <div className={styles.about}>
          <Link href="/" className={styles.brand}>ASI Solutions<span aria-hidden="true"></span></Link>
          <p>Creative thinking. Connected digital experiences. Built around your next chapter.</p>
          <a href={`mailto:${site.email}`} className={styles.email}>{site.email}</a>
        </div>
        <div>
          <span className={styles.columnLabel}>Explore our expertise</span>
          <nav className={styles.navigation} aria-label="Footer navigation">
            {services.map((service) => <Link key={service.slug} href={`/services/${service.slug}`}>{service.name}</Link>)}
            <Link href="/services">All services</Link>
            <Link href="/#work">Selected work</Link>
            <Link href="/#about">About ASI</Link>
          </nav>
        </div>
        <div>
          <span className={styles.columnLabel}>Stay connected</span>
          <SocialLinks />
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 ASI Solutions</span>
        <span>Strategy. Creativity. Technology.</span>
      </div>
    </footer>
  );
}
