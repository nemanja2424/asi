import assert from "node:assert/strict";
import http from "node:http";
import https from "node:https";

// Run against a production build: npm run build; npm start; npm run test:seo.
const base = new URL(process.argv[2] || "http://localhost:3000");
const canonicalOrigin = "https://asi-solution.com";
const slugs = ["web-development", "social-media-management", "content-creation", "ai-automation"];
const paths = ["/", "/services", ...slugs.map((slug) => `/services/${slug}`)];
const titles = new Set();
const descriptions = new Set();
const pages = new Map();

function decode(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key.toLowerCase(), decode(value)]));
}

async function request(path, options) {
  return fetch(new URL(path, base), { signal: AbortSignal.timeout(20000), ...options });
}

for (const path of paths) {
  const response = await request(path, { redirect: "manual" });
  assert.equal(response.status, 200, `${path}: expected 200`);
  assert(!response.headers.get("x-robots-tag")?.includes("noindex"), `${path}: header blocks indexing`);
  const html = await response.text();
  pages.set(path, html);
  assert.match(html, /<html[^>]+lang="en-US"/, `${path}: language missing`);
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${path}: expected one h1`);
  assert.match(html, /id="main-content"/, `${path}: missing main landmark target`);
  const titleTags = [...html.matchAll(/<title>(.*?)<\/title>/gs)];
  assert.equal(titleTags.length, 1, `${path}: expected one title`);
  const title = decode(titleTags[0][1]);
  assert(title.endsWith("| ASI Solutions"), `${path}: missing brand`);
  assert(!titles.has(title), `${path}: duplicate title`);
  titles.add(title);
  const metas = [...html.matchAll(/<meta\b[^>]*>/g)].map(([tag]) => attributes(tag));
  const descriptionTags = metas.filter((meta) => meta.name === "description");
  assert.equal(descriptionTags.length, 1, `${path}: expected one description`);
  const description = descriptionTags[0].content;
  assert(description.length > 70 && !descriptions.has(description), `${path}: missing or duplicate description`);
  descriptions.add(description);
  assert(!metas.some((meta) => ["robots", "googlebot"].includes(meta.name) && /noindex/.test(meta.content)), `${path}: noindex meta`);
  const canonical = [...html.matchAll(/<link\b[^>]*>/g)].map(([tag]) => attributes(tag)).filter((link) => link.rel === "canonical");
  assert.equal(canonical.length, 1, `${path}: expected one canonical`);
  assert.equal(new URL(canonical[0].href).href, new URL(path, canonicalOrigin).href, `${path}: incorrect canonical`);
  assert.equal(new URL(metas.find((meta) => meta.property === "og:url")?.content).href, new URL(path, canonicalOrigin).href, `${path}: incorrect OG URL`);
  assert.equal(metas.find((meta) => meta.property === "og:title")?.content, title, `${path}: incorrect OG title`);
  assert.equal(metas.find((meta) => meta.name === "twitter:card")?.content, "summary_large_image", `${path}: missing social card`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(([, json]) => JSON.parse(json));
  assert.equal(schemas.length, 1, `${path}: expected JSON-LD graph`);
  const graph = schemas[0]["@graph"];
  const types = graph.map((entry) => entry["@type"]);
  assert(types.includes(path === "/services" ? "CollectionPage" : "WebPage"), `${path}: missing page schema`);
  if (path === "/") {
    assert(types.includes("Organization") && types.includes("WebSite"), "Missing organization or website schema");
  } else {
    assert(types.includes("BreadcrumbList"), `${path}: missing breadcrumbs`);
  }
  if (path.startsWith("/services/")) {
    assert(types.includes("Service"), `${path}: missing service schema`);
    assert.equal(graph.find((entry) => entry["@type"] === "Service").url, canonicalOrigin + path);
    assert.equal([...html.matchAll(/<details(?:\s|>)/g)].length, 4, `${path}: FAQs missing from initial HTML`);
    assert.match(html, /id="deliverables"/, `${path}: missing service content`);
  }
  assert(!types.includes("AggregateRating"), `${path}: unverified rating markup`);
  console.log(`PASS ${path}: unique metadata, canonical, headings, JSON-LD, server-rendered content`);
}

// Check the public navigation graph and each local fragment without running JS.
for (const [path, html] of pages) {
  const anchors = [...html.matchAll(/<a\b[^>]*>/g)].map(([tag]) => attributes(tag));
  for (const { href } of anchors) {
    if (!href || (!href.startsWith("/") && !href.startsWith("#"))) continue;
    const target = new URL(href, new URL(path, base));
    assert(pages.has(target.pathname), `${path}: unexpected internal route ${href}`);
    if (target.hash) {
      const id = decodeURIComponent(target.hash.slice(1));
      assert(pages.get(target.pathname).includes(`id="${id}"`), `${path}: broken fragment ${href}`);
    }
  }
  for (const slug of slugs) {
    if (path === `/services/${slug}`) continue;
    assert(anchors.some(({ href }) => href === `/services/${slug}`), `${path}: missing crawlable service link ${slug}`);
  }
}

const sitemapResponse = await request("/sitemap.xml");
assert.equal(sitemapResponse.status, 200);
const sitemap = await sitemapResponse.text();
assert.match(sitemapResponse.headers.get("content-type"), /xml/);
assert.deepEqual([...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(([, url]) => url).sort(), paths.map((path) => canonicalOrigin + path).sort());
const robotsResponse = await request("/robots.txt");
assert.equal(robotsResponse.status, 200);
const robots = await robotsResponse.text();
assert.match(robots, /Sitemap: https:\/\/asi-solution\.com\/sitemap\.xml/);
assert.match(robots, /Allow: \/(?:\r?\n|$)/);
assert(!/^Disallow: \/\s*$/m.test(robots), "Robots blocks the site");

const missing = await request("/services/not-a-service");
assert.equal(missing.status, 404, "Unknown services must return 404");
assert.match(await missing.text(), /name="robots" content="noindex"/, "404 must be noindex");

const image = await request("/opengraph-image");
assert.equal(image.status, 200, "Social image missing");
assert.match(image.headers.get("content-type"), /image\/png/);
const png = Buffer.from(await image.arrayBuffer());
assert.equal(png.readUInt32BE(16), 1200, "Social image width");
assert.equal(png.readUInt32BE(20), 630, "Social image height");

// Host-header testing is for local builds only, so production proxies are not spoofed.
if (["localhost", "127.0.0.1"].includes(base.hostname)) {
  // Node fetch may replace Host. Use a native HTTP request to exercise host matching.
  const redirect = await new Promise((resolve, reject) => {
    const transport = base.protocol === "https:" ? https : http;
    const req = transport.get(new URL("/services/web-development?source=seo-check", base), { headers: { host: "www.asi-solution.com" } }, (res) => {
      res.resume();
      resolve({ status: res.statusCode, location: res.headers.location });
    });
    req.setTimeout(20000, () => req.destroy(new Error("Redirect check timed out")));
    req.on("error", reject);
  });
  assert.equal(redirect.status, 308, "www must permanently redirect");
  assert.equal(redirect.location, canonicalOrigin + "/services/web-development?source=seo-check");
  const prototype = await request("/tests/home");
  assert.match(prototype.headers.get("x-robots-tag") || "", /noindex/, "Local prototypes must not be indexed");
}

console.log("PASS internal links, sitemap, robots, 404 handling, social image, and local redirect/indexing rules");
