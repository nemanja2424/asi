# SEO za ASI Solutions

Implementacija: 18. oktobar 2026. Primarni domen: **https://asi-solution.com**.

## Nalazi pre izmena

- Početna stranica i `/services` delile su generički naslov `ASI Agency` i isti opis.
- `robots.txt` i `sitemap.xml` na javnom domenu vraćali su 404.
- HTTPS adrese sa i bez `www` vraćale su 200 bez međusobnog preusmeravanja i bez canonical oznaka.
- Usluge su bile predstavljene preko hash navigacije. U početnom HTML-u stranice `/services` postojala je samo prva usluga; ostale su zahtevale JavaScript interakciju.
- Uvod na `/services` opisivao je animaciju interfejsa umesto ponude agencije.
- Nije bilo Organization, WebSite, Service ili BreadcrumbList strukturiranih podataka.
- Lokalni, Git-ignorisan direktorijum `src/app/tests` sadrži prototipe koje Next.js ipak uključuje u lokalni build. Dodato je `X-Robots-Tag: noindex, nofollow` pravilo za `/tests/*`. Te putanje nisu u sitemap-u; lokalni prototipi nisu menjani.

## Mapa stranica i namere pretrage

| Stranica | Primarna tema | Dodatna namera |
| --- | --- | --- |
| `/` | ASI Solutions; web design, social media & AI automation | Predstavljanje agencije i pregled ponude |
| `/services` | digital agency services | Izbor odgovarajuće usluge |
| `/services/web-development` | web design and development services | business websites, landing page development, e-commerce websites |
| `/services/social-media-management` | social media management services | content calendars, publishing, profile management |
| `/services/content-creation` | social media content creation services | short-form video, campaign visuals, creative direction |
| `/services/ai-automation` | AI workflow automation services | business process automation, AI assistants, system integration |

Ovo je kvalitativna mapa namere pretrage zasnovana na stvarnoj ponudi i uzorku javnih rezultata pretrage. Nisu dostupni Search Console podaci, plaćeni keyword alati, potvrđeni obimi pretrage ili pouzdana procena težine ključnih reči. Nema tvrdnje da je određena fraza laka za rangiranje.

Američko tržište se obrađuje kroz engleski sadržaj, relevantne poslovne potrebe, `en-US` i `en_US` oznake i US areaServed podatak. Jezičke oznake same po sebi ne garantuju geografsko rangiranje. Nisu dodavane izmišljene američke adrese, lokalni brojevi telefona ili stranice za gradove u kojima agencija nema potvrđeno prisustvo.

SEO nije vraćen u ponudu agencije. Fokus ostaje na četiri aktivne usluge. Nisu dodavani izmišljeni klijenti, rezultati, ocene ili cenovnici. Postojeće brojčane marketinške tvrdnje u prikazu usluga zamenjene su opisima procesa. Postojeći citati klijenata nisu proširivani niti označavani kao recenzije u schema podacima.

## Šta je implementirano

- Jedinstveni title, description i self-canonical za svih šest stranica.
- Statički generisane stranice usluga sa punim sadržajem, procesom, FAQ odgovorima i pozivom na kontakt u početnom HTML-u.
- Očuvan prikaz usluga sa dugmadima i postojećim hash aliasom `social-media-managing`; sada se sve četiri usluge renderuju u HTML-u.
- Direktni linkovi iz hero sekcije, usluga, footera i srodnih stranica. Breadcrumb navigacija na uslugama.
- Organization i WebSite schema na početnoj; WebPage/CollectionPage, Service i BreadcrumbList prema sadržaju stranice.
- `robots.txt`, sitemap sa šest canonical URL-ova i trajno 308 preusmeravanje sa www na primarni domen koje čuva putanju i query parametre.
- Open Graph i Twitter metapodaci sa slikom za deljenje od 1200 × 630 px.
- Podrška za opcione Google i Bing verifikacione meta oznake kroz promenljive okruženja.
- Smislen H1, pristupačan preskok na glavni sadržaj, nazivi linkova i reduced-motion podrška na prikazu usluga.

FAQ je namenjen korisnicima i indeksiranju sadržaja. Ne obećava se FAQ rich result. Nisu dodavani `AggregateRating`, lažni `sameAs` profili, meta keywords, nepotvrđene lokacije, lažni datumi poslednje izmene ili stotine gradskih stranica.

## Održavanje i lokalna provera

- `src/lib/services.js`: sadržaj četiri stranice usluga i izvor ruta za sitemap.
- `src/lib/seo.js`: naziv brenda, primarni domen, e-mail, metadata i schema pomoćne funkcije.
- `src/components/ServicesExplorer.jsx`: kratak interaktivni pregled usluga; uskladiti ga kada se ponuda menja.
- `src/app/opengraph-image.jsx`: slika za deljenje, generisana pri build-u.
- `src/lib/socials.js`: pune Instagram i LinkedIn adrese. Dok je `url` prazan, zajednički footer prikazuje naziv i ikonu sa oznakom „Coming soon“, bez lažnog linka. Kada se unese URL, stavka postaje link ka profilu.
- `scripts/check-seo.mjs`: HTTP provera stvarno renderovanog sajta, bez slanja kontakt forme.

```sh
npm run build
npm run start -- --port 3100
# U drugom terminalu:
npm run test:seo -- http://localhost:3100
```

Provera obuhvata status 200, jedinstvene naslove/opise, canonical i OG URL-ove, jedan H1, parsiranje JSON-LD, server-renderovane FAQ odgovore, interne linkove i fragmente, sadržaj sitemap-a, robots pravila, 404 za nepoznatu uslugu, dimenzije slike, www preusmeravanje i noindex zaglavlje za lokalne prototipe. Vizuelni pregled u browseru nije bio dostupan u ovoj sesiji; mobilni prikaz i Core Web Vitals treba proveriti na deployment-u.

Završna lokalna validacija: produkcioni build je uspešan, ESLint prolazi za sve verzionisane i nove JS/JSX/MJS fajlove (lokalni ignorisani prototipi nisu uključeni), svih šest stranica prolazi `test:seo`, a `git diff --check` nema greške. Slika za deljenje je vizuelno pregledana. To nije potvrda da su izmene već objavljene ili indeksirane.

## Koraci na produkciji

1. Objaviti izmenjeni projekat postojećim hosting postupkom. Ova implementacija ne pokreće deploy i ne menja DNS ili naloge.
2. Proveriti da HTTP prelazi na HTTPS i da hosting ne preusmerava glavni domen nazad na www. Aplikacija sada preusmerava www na `asi-solution.com`; suprotno hosting pravilo mora se ukloniti da ne nastane petlja.
3. U Google Search Console dodati ili otvoriti property za domen. DNS verifikacija domena je moguća; za URL-prefix property i HTML meta metodu postaviti `GOOGLE_SITE_VERIFICATION` na dobijeni token i ponovo uraditi build/deploy. Za Bing HTML verifikaciju analogno postaviti `BING_SITE_VERIFICATION`. Unosi se token, ne kompletan HTML tag. Bez tokena se ne renderuje prazna verifikaciona oznaka.
4. Poslati `https://asi-solution.com/sitemap.xml` u Search Console i Bing Webmaster Tools. U URL Inspection proveriti početnu i četiri usluge, Google-selected canonical i mogućnost indeksiranja.
5. Proveriti početnu u Google Rich Results Test-u, a schema tipove koji nemaju Google rich result u Schema.org validatoru. Validan Service podatak nije obećanje posebnog izgleda rezultata.
6. Proveriti mobilni prikaz, kontakt formu i PageSpeed Insights na produkciji. Search Console Core Web Vitals koristi stvarna korisnička merenja; lokalni build nije zamena za njih.
7. Na preview/staging hostingu uključiti zaštitu ili noindex kroz hosting. Javni produkcioni domen mora ostati dostupan pretraživačima.

## Dalji rad prema podacima

- Pratiti prikaze, klikove, CTR, upite i odredišne stranice, posebno uz country filter United States. Procenjivati i kvalitet upita i projektnih kontakata, ne samo poziciju.
- Dodavati studije slučaja tek kada postoje odobrenje klijenta, stvarni prikazi rada i proverljivi podaci o ulozi agencije i rezultatima. Za početak koristiti postojeće web i social saradnje.
- Potvrditi javne poslovne profile i zatim dodati njihove stvarne linkove u `src/lib/socials.js` i odgovarajuće `sameAs` vrednosti u schema podatke. Footer već ima pripremljena mesta za Instagram i LinkedIn.
- Razvijati koristan sadržaj oko pitanja koja se pojavljuju u Search Console i prodajnim razgovorima. Izbegavati generičke članke bez veze sa ponudom.
- Dogovoriti merenje konverzija u skladu sa postojećom analitikom: uspešno poslata kontakt forma je vredniji signal od samog klika na dugme. Analitički nalozi i tracking ID-jevi nisu izmišljani niti dodavani.

## Referentna dokumentacija

- [Google: title links](https://developers.google.com/search/docs/appearance/title-link) i [meta descriptions](https://developers.google.com/search/docs/appearance/snippet): opisni, jedinstveni naslovi i opisi vezani za sadržaj stranice.
- [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics): dostupnost sadržaja i crawlable linkova.
- [Google: sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): canonical URL-ovi i tačni datumi kada se lastmod koristi.
- [Google: Organization schema](https://developers.google.com/search/docs/appearance/structured-data/organization) i [site names](https://developers.google.com/search/docs/appearance/site-names): dosledan identitet organizacije i sajta.
- [Next.js metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) i [JSON-LD](https://nextjs.org/docs/app/guides/json-ld): server metadata i bezbedna serijalizacija strukturiranih podataka.

Tehnička implementacija i relevantan sadržaj daju osnovu za organsku vidljivost. Indeksiranje, pozicije i rok do rezultata zavise i od konkurencije, autoriteta domena, linkova i ponašanja tržišta; nisu garantovani.
