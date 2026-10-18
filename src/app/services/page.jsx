import Link from "next/link";
import Navbar from "@/components/Navbar";
import ServicesExplorer from "@/components/ServicesExplorer";
import ServiceFooter from "@/components/ServiceFooter";
import ContactButton from "@/components/ContactButton";
import JsonLd from "@/components/JsonLd";
import ServiceIcon, { ArrowIcon } from "@/components/ServiceIcon";
import { services } from "@/lib/services";
import { pageMetadata, webPageSchema, breadcrumbSchema, absoluteUrl } from "@/lib/seo";
import styles from "./page.module.css";
import contentStyles from "@/components/ServiceContent.module.css";

const title = "Web, Social Media & AI Automation Services";
const description = "Explore ASI Solutions' web development, social media management, content creation, and AI automation services for businesses targeting the US market.";
export const metadata = pageMetadata({ title, description, path: "/services" });

export default function ServicesPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [
        { ...webPageSchema({ title, description, path: "/services", type: "CollectionPage" }), mainEntity: {
          "@type": "ItemList",
          itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.name, url: absoluteUrl(`/services/${service.slug}`) })),
        } },
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
      ] }} />
      <Navbar />
      <main id="main-content" className={contentStyles.container}>
        <nav className={contentStyles.breadcrumbs} aria-label="Breadcrumb"><ol><li><Link href="/">Home</Link></li><li aria-current="page">Services</li></ol></nav>
        <section aria-labelledby="services-title">
          <div className={contentStyles.hubHero}>
            <div>
              <span className={contentStyles.eyebrow}>Four disciplines. One creative partner.</span>
              <h1 id="services-title" className={contentStyles.hubTitle}>Web, social media, content <span>&amp; AI automation.</span></h1>
            </div>
            <div>
              <p className={contentStyles.hubIntro}>ASI Solutions connects creative work and technology for businesses targeting the US market. Explore a single service or bring your website, content, social channels, and workflows together in one project.</p>
              <span className={contentStyles.hubIndex}>Explore our expertise / 01 — 04</span>
            </div>
          </div>
          <ServicesExplorer />
        </section>
        <section className={contentStyles.section} aria-labelledby="explore-heading">
          <div className={contentStyles.sectionHeading}>
            <div><span className={contentStyles.eyebrow}>A closer look</span><h2 id="explore-heading">Your next step, thoughtfully built.</h2></div>
            <p>Explore the scope, process, and possibilities behind each service.</p>
          </div>
          <div className={contentStyles.grid}>
            {services.map((service, index) => <article key={service.slug}>
              <Link href={`/services/${service.slug}`} className={contentStyles.directoryCard}>
                <div className={contentStyles.cardTop}>
                  <span className={contentStyles.directoryIcon}><ServiceIcon slug={service.slug} /></span>
                  <span className={contentStyles.cardNumber}>0{index + 1} / EXPERTISE</span>
                </div>
                <h3>{service.name}</h3>
                <p>{service.summary}</p>
                <span className={contentStyles.directoryCta}>Explore the service <ArrowIcon diagonal /></span>
              </Link>
            </article>)}
          </div>
        </section>
        <section className={contentStyles.cta} aria-labelledby="start-heading">
          <span className={contentStyles.eyebrow}>The first conversation</span>
          <h2 id="start-heading">Start with your business goal.</h2>
          <p>Tell us what you want to improve, what you already have, and where your team needs support. We&apos;ll help define a practical project scope.</p>
          <div className={contentStyles.actions}><ContactButton className={contentStyles.button}>Discuss your project <ArrowIcon /></ContactButton></div>
          <span className={contentStyles.ctaMonogram} aria-hidden="true">ASI</span>
        </section>
      </main>
      <ServiceFooter />
    </div>
  );
}
