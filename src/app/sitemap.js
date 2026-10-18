import { absoluteUrl } from "@/lib/seo";
import { services } from "@/lib/services";

export default function sitemap() {
  // No synthetic lastmod: only add one when an actual content revision is tracked.
  return ["/", "/services", ...services.map(({ slug }) => `/services/${slug}`)].map(
    (path) => ({ url: absoluteUrl(path) }),
  );
}
