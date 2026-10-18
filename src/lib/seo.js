export const site = {
  name: "ASI Solutions",
  url: "https://asi-solution.com",
  email: "asi.solutions45@gmail.com",
  description:
    "Web design, social media management, content creation, and AI automation for US businesses. Build a connected digital presence with ASI Solutions.",
};

export function absoluteUrl(path = "/") {
  return new URL(path, site.url).toString();
}

export function pageMetadata({ title, description, path }) {
  const fullTitle = `${title} | ${site.name}`;

  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      type: "website",
      locale: "en_US",
      siteName: site.name,
      url: absoluteUrl(path),
      title: fullTitle,
      description,
      images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: "ASI Solutions — web, social, content and AI automation" }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}

export const organization = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/imeges/ASI.webp"),
    width: 879,
    height: 348,
  },
  email: site.email,
  description: site.description,
  areaServed: { "@type": "Country", name: "United States" },
};

export function webPageSchema({ title, description, path, type = "WebPage" }) {
  return {
    "@type": type,
    "@id": `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${site.url}/#website` },
    about: { "@id": organization["@id"] },
  };
}

export function breadcrumbSchema(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function serviceSchema(service) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.name,
    serviceType: service.name,
    description: service.description,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": organization["@id"] },
    areaServed: organization.areaServed,
  };
}
