import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import ContactButton from "@/components/ContactButton";
import ServiceFooter from "@/components/ServiceFooter";
import ServiceArtwork from "@/components/ServiceArtwork";
import ServiceIcon, { ArrowIcon } from "@/components/ServiceIcon";
import JsonLd from "@/components/JsonLd";
import { services, getService } from "@/lib/services";
import { pageMetadata, webPageSchema, breadcrumbSchema, serviceSchema, site } from "@/lib/seo";
import styles from "@/components/ServiceContent.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  return pageMetadata({ ...service, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }) {
  const service = getService((await params).slug);
  if (!service) notFound();
  const path = `/services/${service.slug}`;
  const serviceNumber = String(services.indexOf(service) + 1).padStart(2, "0");
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];

  return (
    <div className={styles.page}>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          { ...webPageSchema({ title: service.title, description: service.description, path }), mainEntity: { "@id": serviceSchema(service)["@id"] } },
          serviceSchema(service),
          breadcrumbSchema(breadcrumbs),
        ],
      }} />
      <Navbar />
      <main id="main-content" className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <ol>{breadcrumbs.map((crumb, index) => (
            <li key={crumb.path}>
              {index === breadcrumbs.length - 1 ? <span aria-current="page">{crumb.name}</span> : <Link href={crumb.path}>{crumb.name}</Link>}
            </li>
          ))}</ol>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>{serviceNumber} / {service.name}</span>
            <h1 className={styles.title}>{service.heading}</h1>
            <p className={styles.lead}>{service.intro}</p>
            <div className={styles.actions}>
              <ContactButton className={styles.button}>Discuss your project <ArrowIcon /></ContactButton>
              <a href="#deliverables" className={styles.textLink}>What&apos;s included</a>
            </div>
          </div>
          <ServiceArtwork slug={service.slug} />
        </header>

        <div className={styles.serviceStrip}>
          <span><ServiceIcon slug={service.slug} /> A focused approach</span>
          <span>Built around your brand</span>
          <span>Connected to your goals</span>
        </div>

        <section className={`${styles.section} ${styles.introSection}`} aria-labelledby="fit-heading">
          <div><span className={styles.eyebrow}>The starting point</span><h2 id="fit-heading">{service.fitTitle}</h2></div>
          <p>{service.fit}</p>
        </section>

        <section id="deliverables" className={styles.section} aria-labelledby="deliverables-heading">
          <div className={styles.sectionHeading}>
            <div><span className={styles.eyebrow}>Inside the service</span><h2 id="deliverables-heading">Considered in every detail.</h2></div>
            <p>A clear scope. A shared direction. Here&apos;s what we can bring to your project.</p>
          </div>
          <div className={styles.grid}>{service.deliverables.map((item, index) => (
            <article key={item.title} className={styles.card}>
              <div className={styles.cardTop}><span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")} / DELIVERABLE</span><span className={styles.cardMark} aria-hidden="true" /></div>
              <h3>{item.title}</h3><p>{item.text}</p>
            </article>
          ))}</div>
        </section>

        <section className={styles.section} aria-labelledby="process-heading">
          <div className={styles.sectionHeading}>
            <div><span className={styles.eyebrow}>From the first conversation</span><h2 id="process-heading">Good work starts with a clear process.</h2></div>
            <p>Four steps that keep the work focused and your team involved.</p>
          </div>
          <ol className={styles.steps}>{service.process.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.stepNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3><p>{step.text}</p>
            </li>
          ))}</ol>
        </section>

        {service.example && <section className={`${styles.section} ${styles.example}`} aria-labelledby="example-heading">
          <div><span className={styles.eyebrow}>Selected collaborations</span><h2 id="example-heading">{service.example.title}</h2><p>{service.example.text}</p></div>
          <div className={styles.projectLinks}>{service.example.links.map((link) => (
            <a key={link.href} href={link.href} className={styles.projectLink}>{link.name}<ArrowIcon diagonal /></a>
          ))}</div>
        </section>}

        <section className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-heading">
          <div className={styles.faqIntro}>
            <span className={styles.eyebrow}>A little more clarity</span>
            <h2 id="faq-heading">Before we get started.</h2>
            <p>Common questions about {service.name.toLowerCase()}, answered.</p>
            <a href={`mailto:${site.email}`} className={styles.textLink}>Have another question? <ArrowIcon diagonal /></a>
          </div>
          <div className={styles.faq}>{service.faqs.map((faq) => (
            <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>
          ))}</div>
        </section>

        <section className={styles.cta} aria-labelledby="contact-heading">
          <span className={styles.eyebrow}>Your next chapter</span>
          <h2 id="contact-heading">{service.cta}</h2>
          <p>Share your goals, current setup, and the scope you have in mind. We&apos;ll use that to start a focused conversation about your project.</p>
          <div className={styles.actions}>
            <ContactButton className={styles.button}>Start a project <ArrowIcon /></ContactButton>
            <a href={`mailto:${site.email}`} className={styles.textLink}>Send an email</a>
          </div>
          <span className={styles.ctaMonogram} aria-hidden="true">ASI</span>
        </section>

        <nav className={styles.section} aria-label="Related services">
          <span className={styles.eyebrow}>Better, together</span>
          <h2>Connect the rest of your digital presence.</h2>
          <ul className={styles.related}>{services.filter((item) => item.slug !== service.slug).map((item) => (
            <li key={item.slug}><Link href={`/services/${item.slug}`}>
              <ServiceIcon slug={item.slug} />
              <div><strong>{item.name}</strong><span>{item.summary}</span></div>
              <ArrowIcon diagonal />
            </Link></li>
          ))}</ul>
        </nav>
      </main>
      <ServiceFooter />
    </div>
  );
}
